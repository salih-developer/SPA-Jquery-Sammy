using Newtonsoft.Json;
using System.Data;
using System.Data.SqlClient;
using System.Data.SqlTypes;
using System.Text.Json.Serialization;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddRazorPages();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Error");
}
app.UseStaticFiles();

app.UseRouting();

app.UseAuthorization();

app.MapRazorPages();

app.UseEndpoints(endpoints =>
{
    endpoints.MapGet("/edit-form-data/{id:alpha}", async context =>
    {
        string sql = @"select DISTINCT top 100  Invoice.BaseID, 
                        'ProformaID' = vwInvoiceProductList.ProformaID, 
                        'FaturaAciklamasi' = vwInvoiceProductList.FaturaAciklamasi, 
                        'BelgeTarihi' = vwInvoiceProductList.BelgeTarihi, 
                        'BelgeSeriNumarasi' = vwInvoiceProductList.BelgeSeriNumarasi, 
                        'MalAdi' = dbo.getDataFromLangId(vwInvoiceProductList.MalAdi,2)
                         from Invoice (nolock) 
                         LEFT OUTER JOIN vwInvoiceProductList (nolock) on vwInvoiceProductList.BaseID = Invoice.BaseID where  1 = 1 ";
        using (var ccn=new SqlConnection("Data Source=172.16.0.205\\DEV12;Initial Catalog=dev_SetBase;Integrated Security=True"))
        {
            ccn.Open();
            SqlDataAdapter adapter = new SqlDataAdapter(sql,ccn);
            DataSet ds = new DataSet();
            adapter.Fill(ds);
          var data= JsonConvert.SerializeObject(ds.Tables[0],new JsonSerializerSettings
            {
                StringEscapeHandling=StringEscapeHandling.EscapeHtml

            });
            context.Response.ContentType = "application/json";
            await context.Response.WriteAsync(data);
        }  
        
    });
});

app.Run();
