const detectors = [
    {
        regex: /\b[\w._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}\b/g,
        type: 'PII',
        mask: () => '***@***.***',
        suggestion: 'Anonimize o e-mail.'
    },
    {
        regex: /\b(?:\+?\d{1,3}\s?)?(?:\(?\d{2}\)?\s?)?\d{4,5}[-\s]?\d{4}\b/g,
        type: 'PII',
        mask: (m) => m.replace(/\d/g, '*'),
        suggestion: 'Remova o número de telefone.'
    },
    {
        regex: /\b(?:Rua|R\.|Avenida|Av\.?|Estrada|Travessa|Rodovia)\s+[^\n,]*\d+\b/gi,
        type: 'PII',
        mask: () => '***',
        suggestion: 'Oculte o endereço.'
    },
    {
        regex: /\b(?:dose|ml|mg|via|paciente\s+errado)\b/gi,
        type: 'CLINICAL_RISK',
        suggestion: 'Reveja o termo clínico.'
    }
];
export function scanDanger(text) {
    const flags = [];
    let safeText = text;
    detectors.forEach(det => {
        const reg = new RegExp(det.regex.source, det.regex.flags);
        for (const match of text.matchAll(det.regex)) {
            const start = match.index ?? 0;
            flags.push({
                type: det.type,
                start,
                end: start + match[0].length,
                suggestion: det.suggestion
            });
        }
        if (det.type === 'PII') {
            safeText = safeText.replace(reg, det.mask);
        }
    });
    return { safeText, flags };
}
