class StringIntern {
    private _interns: Record<string, string> = {};

    get interns(): Record<string, string> {
        return this._interns;
    }

    add(str: string): string {
        if (str in this._interns) {
            return this._interns[str];
        } else {
            this._interns[str] = str;
            return str;
        }
    }
}

export default new StringIntern();