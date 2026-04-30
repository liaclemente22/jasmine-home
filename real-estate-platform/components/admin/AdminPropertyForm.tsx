"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import type { Property } from "@/data/properties";

type Props = {
    mode: "create" | "edit";
    property?: Property;
};

type FieldErrors = Partial<
    Record<
        | "id"
        | "title"
        | "price"
        | "bedrooms"
        | "bathrooms"
        | "area"
        | "location"
        | "description"
        | "images",
        string
    >
>;

function toCsv(images: string[] | undefined) {
    return images?.join(", ") ?? "";
}

export default function AdminPropertyForm({ mode, property }: Props) {
    const router = useRouter();
    const [error, setError] = useState("");
    const [uploadMessage, setUploadMessage] = useState("");
    const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
    const [loading, setLoading] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [imageUrls, setImageUrls] = useState<string[]>(property?.images ?? []);

    const inputClassName = (field: keyof FieldErrors) =>
        `w-full rounded-full border bg-[var(--background)] px-5 py-3 outline-none ${
            fieldErrors[field] ? "border-red-300" : "border-[#e8ddd0]"
        }`;

    const textareaClassName = (field: keyof FieldErrors) =>
        `w-full rounded-[1.5rem] border bg-[var(--background)] px-5 py-4 outline-none ${
            fieldErrors[field] ? "border-red-300" : "border-[#e8ddd0]"
        }`;

    const helpTextClassName = (field: keyof FieldErrors) =>
        `mt-2 text-xs leading-5 ${fieldErrors[field] ? "text-red-600" : "text-[var(--muted)]"}`;

    const validatePayload = (payload: {
        id: string;
        title: string;
        price: number;
        bedrooms: number;
        bathrooms: number;
        area: number;
        location: string;
        description: string;
        images: string[];
    }) => {
        const nextErrors: FieldErrors = {};

        if (!payload.id) {
            nextErrors.id = "A listing ID helps keep admin edits and uploads organized.";
        } else if (!/^[a-z0-9-]+$/.test(payload.id)) {
            nextErrors.id = "Use lowercase letters, numbers, and hyphens only.";
        }

        if (!payload.title) {
            nextErrors.title = "Add a listing title that visitors will recognize quickly.";
        }

        if (!Number.isFinite(payload.price) || payload.price <= 0) {
            nextErrors.price = "Enter a valid price greater than zero.";
        }

        if (!Number.isFinite(payload.bedrooms) || payload.bedrooms < 0) {
            nextErrors.bedrooms = "Bedrooms must be zero or more.";
        }

        if (!Number.isFinite(payload.bathrooms) || payload.bathrooms < 0) {
            nextErrors.bathrooms = "Bathrooms must be zero or more.";
        }

        if (!Number.isFinite(payload.area) || payload.area <= 0) {
            nextErrors.area = "Enter the floor area in square meters.";
        }

        if (!payload.location) {
            nextErrors.location = "Add the city, district, or neighborhood for this listing.";
        }

        if (!payload.description) {
            nextErrors.description = "Add a short description to guide inquiries.";
        } else if (payload.description.length < 40) {
            nextErrors.description = "A slightly fuller description helps this listing feel real and useful.";
        }

        if (payload.images.length === 0) {
            nextErrors.images = "Please upload at least one image.";
        }

        return nextErrors;
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setError("");
        setUploadMessage("");
        setFieldErrors({});
        setLoading(true);

        const formData = new FormData(event.currentTarget);
        const payload = {
            id: String(formData.get("id") || "").trim(),
            title: String(formData.get("title") || "").trim(),
            price: Number(formData.get("price")),
            bedrooms: Number(formData.get("bedrooms")),
            bathrooms: Number(formData.get("bathrooms")),
            area: Number(formData.get("area")),
            location: String(formData.get("location") || "").trim(),
            type: formData.get("type"),
            status: formData.get("status"),
            featured: formData.get("featured") === "true",
            description: String(formData.get("description") || "").trim(),
            images: imageUrls,
        };

        const validationErrors = validatePayload(payload);

        if (Object.keys(validationErrors).length > 0) {
            setFieldErrors(validationErrors);
            if (validationErrors.images) {
                setError(validationErrors.images);
            }
            setLoading(false);
            return;
        }

        const url =
            mode === "create"
                ? "/api/properties"
                : `/api/properties/${property?.id}`;
        const method = mode === "create" ? "POST" : "PATCH";

        const res = await fetch(url, {
            method,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
        });

        const result = await res.json();

        if (!result.success) {
            setError(result.error || "Unable to save property");
            setLoading(false);
            return;
        }

        router.push(`/admin/properties?success=${mode === "create" ? "created" : "updated"}`);
        router.refresh();
    };

    const handleUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(event.target.files ?? []);

        if (files.length === 0) return;

        setError("");
        setUploadMessage("");
        setFieldErrors((current) => ({ ...current, images: undefined }));
        setUploading(true);

        try {
            const propertyId =
                (property?.id || (document.querySelector('input[name="id"]') as HTMLInputElement | null)?.value || "")
                    .trim() || "draft";

            const uploadedUrls: string[] = [];

            for (const file of files) {
                const uploadData = new FormData();
                uploadData.append("file", file);
                uploadData.append("propertyId", propertyId);

                const response = await fetch("/api/admin/upload-image", {
                    method: "POST",
                    body: uploadData,
                });

                const result = await response.json();

                if (!result.success) {
                    throw new Error(result.error || "Failed to upload image");
                }

                uploadedUrls.push(result.imageUrl);
            }

            setImageUrls((current) => [...current, ...uploadedUrls]);
            setUploadMessage(
                `${uploadedUrls.length} image${uploadedUrls.length === 1 ? "" : "s"} uploaded successfully.`
            );
            event.target.value = "";
        } catch (uploadError) {
            setError(
                uploadError instanceof Error
                    ? uploadError.message
                    : "Unable to upload image"
            );
        } finally {
            setUploading(false);
        }
    };

    const removeImage = (url: string) => {
        setImageUrls((current) => current.filter((image) => image !== url));
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="rounded-[2rem] border border-[#e9dfd3] bg-white p-8 shadow-[0_18px_40px_rgba(87,74,60,0.05)]"
        >
            <div className="grid gap-5 md:grid-cols-2">
                <div>
                    <label className="mb-2 block text-sm text-[var(--textDark)]">Listing ID</label>
                    <input
                        name="id"
                        defaultValue={property?.id}
                        placeholder="e.g. makati-condo-001"
                        className={inputClassName("id")}
                    />
                    <p className={helpTextClassName("id")}>
                        {fieldErrors.id ?? "Use a stable slug so edits and uploads stay tied to the right listing."}
                    </p>
                </div>

                <div>
                    <label className="mb-2 block text-sm text-[var(--textDark)]">Title</label>
                    <input
                        name="title"
                        required
                        defaultValue={property?.title}
                        className={inputClassName("title")}
                    />
                    <p className={helpTextClassName("title")}>
                        {fieldErrors.title ?? "Keep it clear and searchable, like the headline a client would click."}
                    </p>
                </div>

                <div>
                    <label className="mb-2 block text-sm text-[var(--textDark)]">Price</label>
                    <input
                        name="price"
                        type="number"
                        required
                        defaultValue={property?.price}
                        className={inputClassName("price")}
                    />
                    <p className={helpTextClassName("price")}>
                        {fieldErrors.price ?? "Use the monthly amount for rentals and full asking price for sale listings."}
                    </p>
                </div>

                <div>
                    <label className="mb-2 block text-sm text-[var(--textDark)]">Location</label>
                    <input
                        name="location"
                        required
                        defaultValue={property?.location}
                        className={inputClassName("location")}
                    />
                    <p className={helpTextClassName("location")}>
                        {fieldErrors.location ?? "Examples: Makati, BGC, Ortigas, Quezon City."}
                    </p>
                </div>

                <div>
                    <label className="mb-2 block text-sm text-[var(--textDark)]">Bedrooms</label>
                    <input
                        name="bedrooms"
                        type="number"
                        required
                        defaultValue={property?.bedrooms}
                        className={inputClassName("bedrooms")}
                    />
                    <p className={helpTextClassName("bedrooms")}>
                        {fieldErrors.bedrooms ?? "Use `0` for studio-style layouts if needed."}
                    </p>
                </div>

                <div>
                    <label className="mb-2 block text-sm text-[var(--textDark)]">Bathrooms</label>
                    <input
                        name="bathrooms"
                        type="number"
                        required
                        defaultValue={property?.bathrooms}
                        className={inputClassName("bathrooms")}
                    />
                    <p className={helpTextClassName("bathrooms")}>
                        {fieldErrors.bathrooms ?? "Half baths can still be rounded up if that matches your listing style."}
                    </p>
                </div>

                <div>
                    <label className="mb-2 block text-sm text-[var(--textDark)]">Area (sqm)</label>
                    <input
                        name="area"
                        type="number"
                        required
                        defaultValue={property?.area}
                        className={inputClassName("area")}
                    />
                    <p className={helpTextClassName("area")}>
                        {fieldErrors.area ?? "This shows in cards and detail pages, so keep it accurate."}
                    </p>
                </div>

                <div>
                    <label className="mb-2 block text-sm text-[var(--textDark)]">Type</label>
                    <select
                        name="type"
                        required
                        defaultValue={property?.type ?? "rent"}
                        className={inputClassName("title")}
                    >
                        <option value="rent">Rent</option>
                        <option value="sale">Sale</option>
                    </select>
                    <p className="mt-2 text-xs leading-5 text-[var(--muted)]">
                        This decides where the listing appears and which detail route it uses.
                    </p>
                </div>

                <div>
                    <label className="mb-2 block text-sm text-[var(--textDark)]">Status</label>
                    <select
                        name="status"
                        required
                        defaultValue={property?.status ?? "available"}
                        className={inputClassName("title")}
                    >
                        <option value="available">Available</option>
                        <option value="reserved">Reserved</option>
                        <option value="sold">Sold</option>
                    </select>
                    <p className="mt-2 text-xs leading-5 text-[var(--muted)]">
                        Only available homes should stay visible to active shoppers.
                    </p>
                </div>

                <div>
                    <label className="mb-2 block text-sm text-[var(--textDark)]">Featured</label>
                    <select
                        name="featured"
                        defaultValue={property?.featured ? "true" : "false"}
                        className={inputClassName("title")}
                    >
                        <option value="false">No</option>
                        <option value="true">Yes</option>
                    </select>
                    <p className="mt-2 text-xs leading-5 text-[var(--muted)]">
                        Featured homes can surface on the homepage and in more prominent site areas.
                    </p>
                </div>
            </div>

            <div className="mt-5">
                <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                    <label className="block text-sm text-[var(--textDark)]">Listing Images</label>
                    <p className="text-xs tracking-[0.12em] text-[#8c7c6a]">
                        Upload one or more property photos
                    </p>
                </div>

                <div className="mt-3 rounded-[1.5rem] border border-dashed border-[#d8cdc0] bg-[var(--background)] p-5">
                    <input
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={handleUpload}
                        className="block w-full text-sm text-[var(--muted)] file:mr-4 file:rounded-full file:border-0 file:bg-[var(--darkSage)] file:px-4 file:py-2 file:text-xs file:tracking-[0.16em] file:text-white"
                    />
                    <p className="mt-3 text-xs leading-6 text-[var(--muted)]">
                        Uploaded images will be stored in Cloudinary and attached to this listing.
                    </p>
                    {fieldErrors.images && (
                        <p className="mt-2 text-xs leading-5 text-red-600">{fieldErrors.images}</p>
                    )}
                </div>

                {uploading && (
                    <p className="mt-3 text-sm text-[var(--darkSage)]">Uploading images...</p>
                )}

                {uploadMessage && (
                    <div className="mt-3 rounded-[1.25rem] border border-[#d9e6df] bg-[#f3f8f5] px-4 py-3 text-sm text-[var(--darkSage)]">
                        {uploadMessage}
                    </div>
                )}

                {imageUrls.length > 0 && (
                    <div className="mt-4 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                        {imageUrls.map((url) => (
                            <div
                                key={url}
                                className="overflow-hidden rounded-[1.25rem] border border-[#e8ddd0] bg-[var(--background)]"
                            >
                                <div
                                    className="h-40 w-full bg-cover bg-center"
                                    style={{ backgroundImage: `url(${url})` }}
                                />
                                <div className="flex items-center justify-between gap-3 p-3">
                                    <p className="line-clamp-2 text-xs text-[var(--muted)]">
                                        {url}
                                    </p>
                                    <button
                                        type="button"
                                        onClick={() => removeImage(url)}
                                        className="shrink-0 rounded-full border border-red-200 px-3 py-1 text-[10px] tracking-[0.16em] text-red-600"
                                    >
                                        REMOVE
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                <input
                    type="hidden"
                    name="images"
                    value={toCsv(imageUrls)}
                    readOnly
                />
            </div>

            <div className="mt-5">
                <label className="mb-2 block text-sm text-[var(--textDark)]">Description</label>
                <textarea
                    name="description"
                    rows={6}
                    required
                    defaultValue={property?.description}
                    className={textareaClassName("description")}
                />
                <p className={helpTextClassName("description")}>
                    {fieldErrors.description ??
                        "Aim for 1 to 3 helpful sentences covering feel, location, and what makes the home stand out."}
                </p>
            </div>

            {error && (
                <div className="mt-4 rounded-[1.25rem] border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                    {error}
                </div>
            )}

            <button
                type="submit"
                disabled={loading}
                className="mt-6 rounded-full bg-[var(--darkSage)] px-6 py-3 text-sm tracking-[0.18em] text-white transition hover:bg-[#394842] disabled:opacity-60"
            >
                {loading ? "SAVING..." : mode === "create" ? "CREATE LISTING" : "SAVE CHANGES"}
            </button>
        </form>
    );
}
