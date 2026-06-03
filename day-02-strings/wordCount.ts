export default function wordCount(text: string): number {
    if (!text) return 0;
    const words = text.trim().split(' ');
    return words.length;
}