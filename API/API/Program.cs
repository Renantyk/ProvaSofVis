using API.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddDbContext<AppDataContext>();

var app = builder.Build();


app.MapGet("/", () => "Prova A1");

//ENDPOINTS DE CATEGORIA
//GET: http://localhost:5000/api/categoria/listar
app.MapGet("/api/categoria/listar", ([FromServices] AppDataContext ctx) =>
{
    if (ctx.Categorias.Any())
    {
        return Results.Ok(ctx.Categorias.ToList());
    }
    return Results.NotFound("Nenhuma categoria encontrada");
});

//POST: http://localhost:5000/api/categoria/cadastrar
app.MapPost("/api/categoria/cadastrar", ([FromServices] AppDataContext ctx, [FromBody] Categoria categoria) =>
{
    ctx.Categorias.Add(categoria);
    ctx.SaveChanges();
    return Results.Created("", categoria);
});

//ENDPOINTS DE TAREFA
//GET: http://localhost:5000/api/tarefas/listar
app.MapGet("/api/tarefas/listar", ([FromServices] AppDataContext ctx) =>
{
    if (ctx.Tarefas.Any())
    {
        return Results.Ok(ctx.Tarefas.Include(x => x.Categoria).ToList());
    }
    return Results.NotFound("Nenhuma tarefa encontrada");
});

//POST: http://localhost:5000/api/tarefas/cadastrar
app.MapPost("/api/tarefas/cadastrar", ([FromServices] AppDataContext ctx, [FromBody] Tarefa tarefa) =>
{
    Categoria? categoria = ctx.Categorias.Find(tarefa.CategoriaId);
    if (categoria == null)
    {
        return Results.NotFound("Categoria não encontrada");
    }
    tarefa.Categoria = categoria;
    ctx.Tarefas.Add(tarefa);
    ctx.SaveChanges();
    return Results.Created("", tarefa);
});

//PUT: http://localhost:5000/tarefas/alterar/{id}
app.MapPut("/api/tarefas/alterar/{id}", ([FromServices] AppDataContext ctx, [FromRoute] string id, [FromBody] Tarefa tarefaAlterado) =>
{
    Tarefa? tarefa = ctx.Tarefas.Find(id);
    if (tarefa == null){
        return Results.NotFound();
    }

    if (tarefa.Status == "Em andamento"){
        tarefa.Status = "Concluido";
    }

    if (tarefa.Status == "Concluido"){
        tarefa.Status = "Em andamento";
    }

    tarefa.Status = tarefaAlterado.Status;
    ctx.SaveChanges();
    return Results.Ok(tarefa);
});

//GET: http://localhost:5000/tarefas/naoconcluidas
app.MapGet("/api/tarefas/naoconcluidas/{id}", ([FromServices] AppDataContext ctx, [FromRoute] string id) =>
{
    //Implementar a listagem de tarefas não concluídas
    Tarefa? tarefa = ctx.Tarefas.Find(id);

    if (tarefa.Status == "Nao inicializado" || tarefa.Status == "Em andamento"){
        if (ctx.Tarefas.Any()){
            return Results.Ok(ctx.Tarefas.ToList());
        }
    }

    return Results.NotFound();
});

//GET: http://localhost:5000/tarefas/concluidas
app.MapGet("/api/tarefas/concluidas", ([FromServices] AppDataContext ctx, [FromRoute] string id) =>
{
    //Implementar a listagem de tarefas concluídas
     Tarefa? tarefa = ctx.Tarefas.Find(id);

    if (tarefa.Status == "Concluida"){
        if (ctx.Tarefas.Any()){
            return Results.Ok(ctx.Tarefas.ToList());
        }
    }

    return Results.NotFound();
});

app.Run();
