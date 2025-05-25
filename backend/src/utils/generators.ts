import { ulid } from 'ulid';
import { nanoid } from 'nanoid';

export function generateULID(): string {
    return ulid();
}

export function generateSlug(name: string): string {
    const slugifiedName = name
        .toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/[^\w-]+/g, '')
        .replace(/--+/g, '-')
        .replace(/^-+/, '')
        .replace(/-+$/, '');
    return `${slugifiedName}-${nanoid(6)}`;
}
