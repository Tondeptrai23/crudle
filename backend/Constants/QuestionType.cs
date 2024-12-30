namespace _3w1m.Constants;

public static class QuestionType
{
    public const string FillInBlank = "Fill In Blank";

    public const string MultipleChoice = "Multiple Choice";

    public static string[] GetTypes()
    {
        return new string[] { FillInBlank, MultipleChoice };
    }
}