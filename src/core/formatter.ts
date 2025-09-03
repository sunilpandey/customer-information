let numberFormatter: Intl.NumberFormat | null = null;

export function formatNumber(value: number): string {
    if (!numberFormatter) {
        numberFormatter = new Intl.NumberFormat("en-US");
    }
    return numberFormatter.format(value);
    
}
