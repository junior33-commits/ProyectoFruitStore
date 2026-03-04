package com.utl.fruitstore.rest;

import com.google.gson.Gson;
import com.utl.fruitstore.controller.ControllerCategoria;
import com.utl.fruitstore.model.Categoria;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import java.util.List;

@Path("categoria")
public class RESTCategoria 
{
    @GET
    @Path("getAll")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getAll(@QueryParam("filtro") @DefaultValue("") String filtro)
    {
        String out;
        ControllerCategoria cc = new ControllerCategoria();
        Gson gson = new Gson();
        
        try
        {
            List<Categoria> lista = cc.getAll(filtro);
            out = gson.toJson(lista);
        }
        catch (Exception e)
        {
            out = "{\"exception\":\"" + e.toString().replace("\"", "") + "\"}";
        }
        
        return Response.ok(out).build();
    }

    @POST
    @Path("save")
    @Produces(MediaType.APPLICATION_JSON)
    public Response save(@FormParam("categoria") String datosCategoria)
    {
        System.out.println("DATOS CATEGORIA: " + datosCategoria);
        String out;
        ControllerCategoria cc = new ControllerCategoria();
        Gson gson = new Gson();
        
        try
        {
            Categoria c = gson.fromJson(datosCategoria, Categoria.class);
            
            if (c.getId() == 0)
                cc.insert(c);
            else
                cc.update(c);
            
            out = gson.toJson(c);
        }
        catch (Exception e)
        {
            out = "{\"exception\":\"" + e.toString().replace("\"", "") + "\"}";
        }
        
        return Response.ok(out).build();
    }

    @POST
    @Path("delete")
    @Produces(MediaType.APPLICATION_JSON)
    public Response delete(@QueryParam("id") int id)
    {
        String out;
        ControllerCategoria cc = new ControllerCategoria();
        
        try
        {
            cc.delete(id);
            out = "{\"result\":\"OK\"}";
        }
        catch (Exception e)
        {
            out = "{\"exception\":\"" + e.toString().replace("\"", "") + "\"}";
        }
        
        return Response.ok(out).build();
    }
}