/**
 * Grading Service
 * Handles numeric to letter grade conversion
 */

export const calculateLetterGrade = (score: number, total: number = 100): string => {
    const percentage = (score / total) * 100;

    if (percentage >= 90) return 'A';
    if (percentage >= 80) return 'B';
    if (percentage >= 70) return 'C';
    if (percentage >= 60) return 'D';
    return 'F';
};

export const getGradeColor = (grade: string): string => {
    switch (grade) {
        case 'A': return 'text-green-600';
        case 'B': return 'text-blue-600';
        case 'C': return 'text-yellow-600';
        case 'D': return 'text-orange-600';
        case 'F': return 'text-red-600';
        default: return 'text-gray-600';
    }
};
