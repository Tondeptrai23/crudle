export class AlphabetMapper {
  private static readonly letterMap: Map<number, string> = new Map();

  static {
    for (let i = 0; i <= 26; i++) {
      AlphabetMapper.letterMap.set(i, String.fromCharCode(65 + i));
    }
  }

  static numberToLetter(num: number): string | null {
    if (!Number.isInteger(num)) {
      return null;
    }

    return AlphabetMapper.letterMap.get(num) || null;
  }

  static letterToNumber(letter: string): number | null {
    if (!/^[A-Z]$/.test(letter)) {
      return null;
    }

    return letter.charCodeAt(0) - 65;
  }
}

export class UrlExtractor {
  static extractCourseId(): number {
    const match = window.location.pathname.match(/course\/(\d+)/);

    if (!match) {
      return 0;
    }

    return parseInt(match[1]);
  }

  static extractAssignmentId(): number {
    const match = window.location.pathname.match(/assignment\/(\d+)/);

    if (!match) {
      return 0;
    }

    return parseInt(match[1]);
  }
}
