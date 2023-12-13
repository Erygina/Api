using api4_signalR_vik; // пространство имен класса ChatHub

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddSignalR();      // подключема сервисы SignalR

var app = builder.Build();

app.UseDefaultFiles();
app.UseStaticFiles();

app.MapHub<ChatHub>("/chat");   // ChatHub будет обрабатывать запросы по пути /chat

app.Run();