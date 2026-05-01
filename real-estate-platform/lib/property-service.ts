import { connectDB } from "@/lib/mongodb";
import { PropertyModel } from "@/models/Property";
import { properties as seedProperties, type Property } from "@/data/properties";

export type PropertyFilters = {
    bedrooms?: number;
    featured?: boolean;
    location?: string;
    maxPrice?: number;
    search?: string;
    sort?: "priceLowHigh" | "priceHighLow" | "bedrooms";
    status?: Property["status"];
    type?: Property["type"];
};

type PropertyRecord = Property & {
    createdAt?: Date;
    updatedAt?: Date;
    _id?: unknown;
};

function serializeProperty(record: PropertyRecord): Property {
    return {
        id: record.id,
        title: record.title,
        price: record.price,
        bedrooms: record.bedrooms,
        bathrooms: record.bathrooms,
        area: record.area,
        location: record.location,
        type: record.type,
        status: record.status,
        featured: record.featured,
        description: record.description,
        images: record.images,
    };
}

function getFallbackProperties(filters: PropertyFilters = {}) {
    let fallback = [...seedProperties];

    if (filters.type) fallback = fallback.filter((property) => property.type === filters.type);
    if (filters.status) fallback = fallback.filter((property) => property.status === filters.status);
    if (filters.featured !== undefined) {
        fallback = fallback.filter((property) => Boolean(property.featured) === filters.featured);
    }
    if (filters.location) fallback = fallback.filter((property) => property.location === filters.location);
    if (filters.bedrooms !== undefined) {
        fallback = fallback.filter((property) => property.bedrooms === filters.bedrooms);
    }
    if (filters.maxPrice !== undefined) {
        const maxPrice = filters.maxPrice;
        fallback = fallback.filter((property) => property.price <= maxPrice);
    }
    if (filters.search) {
        const query = filters.search.toLowerCase();
        fallback = fallback.filter(
            (property) =>
                property.title.toLowerCase().includes(query) ||
                property.location.toLowerCase().includes(query)
        );
    }

    if (filters.sort === "priceLowHigh") fallback.sort((a, b) => a.price - b.price);
    if (filters.sort === "priceHighLow") fallback.sort((a, b) => b.price - a.price);
    if (filters.sort === "bedrooms") fallback.sort((a, b) => b.bedrooms - a.bedrooms);

    return fallback;
}

async function ensureSeedProperties() {
    const count = await PropertyModel.countDocuments();

    if (count === 0) {
        await PropertyModel.insertMany(seedProperties, { ordered: false });
    }
}

export async function getAllProperties(filters: PropertyFilters = {}) {
    try {
        await connectDB();
        await ensureSeedProperties();

        const query: Record<string, unknown> = {};

        if (filters.type) query.type = filters.type;
        if (filters.status) query.status = filters.status;
        if (filters.featured !== undefined) query.featured = filters.featured;
        if (filters.location) query.location = filters.location;
        if (filters.bedrooms !== undefined) query.bedrooms = filters.bedrooms;
        if (filters.maxPrice !== undefined) query.price = { $lte: filters.maxPrice };
        if (filters.search) {
            const regex = new RegExp(filters.search, "i");
            query.$or = [{ title: regex }, { location: regex }];
        }

        let mongooseQuery = PropertyModel.find(query).lean<PropertyRecord[]>();

        if (filters.sort === "priceLowHigh") mongooseQuery = mongooseQuery.sort({ price: 1 });
        if (filters.sort === "priceHighLow") mongooseQuery = mongooseQuery.sort({ price: -1 });
        if (filters.sort === "bedrooms") mongooseQuery = mongooseQuery.sort({ bedrooms: -1 });

        const records = await mongooseQuery;
        return records.map(serializeProperty);
    } catch (error) {
        console.warn("Falling back to local property seed data:", error);
        return getFallbackProperties(filters);
    }
}

export async function getPropertyById(id: string) {
    try {
        await connectDB();
        await ensureSeedProperties();

        const record = await PropertyModel.findOne({ id }).lean<PropertyRecord | null>();
        return record ? serializeProperty(record) : null;
    } catch (error) {
        console.warn(`Falling back to local property seed data for property ${id}:`, error);
        return seedProperties.find((property) => property.id === id) ?? null;
    }
}

export async function createProperty(property: Property) {
    await connectDB();
    const created = await PropertyModel.create(property);
    return serializeProperty(created.toObject() as PropertyRecord);
}

export async function updateProperty(id: string, updates: Partial<Property>) {
    await connectDB();
    const updated = await PropertyModel.findOneAndUpdate({ id }, updates, {
        new: true,
        lean: true,
    });

    return updated ? serializeProperty(updated as PropertyRecord) : null;
}

export async function deleteProperty(id: string) {
    await connectDB();
    const deleted = await PropertyModel.findOneAndDelete({ id }).lean<PropertyRecord | null>();
    return deleted ? serializeProperty(deleted) : null;
}
