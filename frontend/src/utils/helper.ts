import { useParams } from 'react-router-dom';

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

export const useCustomParams = () => {
  const params = useParams();
  const customParams = Object.fromEntries(
    Object.entries(params).map(([key, value]) => {
      if (value === 'undefined') {
        return [key, -1];
      }

      return [key, parseInt(value ?? '')];
    }),
  );

  return customParams;
};

export const generateUniqueId = (): number => {
  return parseInt(
    Date.now().toString() + Math.floor(Math.random() * 1000).toString(),
  );
};
