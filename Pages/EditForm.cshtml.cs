using Microsoft.AspNetCore.Mvc.RazorPages;

namespace WebApplication50.Pages
{
    public class EditFormModel : PageModel
    {
        public string? Id { get; set; }
        public void OnGet(string id)
        {
            Id = id;
        }
    }
}
