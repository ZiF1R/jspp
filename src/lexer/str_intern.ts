const interns: Record<string, string> = {};

export function str_intern(str: string): string {
    if (str in interns) {
        return interns[str];
    } else {
        interns[str] = str;
        return str;
    }
}