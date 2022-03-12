namespace Domain;

public class Post
{
    public Guid Id { get; set; }

    public string Title { get; set; }

    public string Description { get; set; }

    public DateTime Created { get; set; }

    public DateTime Modified { get; set; }
}
