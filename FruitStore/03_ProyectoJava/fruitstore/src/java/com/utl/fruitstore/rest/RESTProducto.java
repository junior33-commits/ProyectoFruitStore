package com.utl.fruitstore.rest;

import com.google.gson.Gson;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.QueryParam;
import jakarta.ws.rs.DefaultValue;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import com.utl.fruitstore.controller.ControllerProducto;
import com.utl.fruitstore.model.Producto;
import jakarta.ws.rs.FormParam;
import jakarta.ws.rs.POST;
import java.util.List;

@Path("producto")
public class RESTProducto {

    @GET
    @Path("getAll")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getAll(@QueryParam("filtro") @DefaultValue("") String filtro){
        String out = null;
        List<Producto> productos = null;
        ControllerProducto cp= new ControllerProducto();
        Gson gson = new Gson();
        try
        {
            productos = cp.getAll(filtro);
            out = gson.toJson(productos);
        }
        catch (Exception e)
        {
            e.printStackTrace();
            out = """
                  {
                    "exception" : "%s"
                  }
                  """;
            out = String.format(out, e.toString().replaceAll("\"", ""));
        }
        return Response.ok(out).build();
    }
    
    @POST
    @Path("save")
    @Produces(MediaType.APPLICATION_JSON)
    public Response save(@FormParam("producto") String datosProducto)
    {
        System.out.println(datosProducto);
        String out = null;
        ControllerProducto cp = new ControllerProducto();
        Gson gson = new Gson();
        Producto p = null;
        try
        {
            p = gson.fromJson(datosProducto, Producto.class);
            if(p == null)
                out = "{\"error\": \"No se proporconaron datos del producto.\"}";
            else
            {
                if (p.getId() == 0)
                    cp.insert(p);
                else
                    cp.update(p);
                out = new Gson().toJson(p);
            }
        }
        catch (Exception e)
        {
            e.printStackTrace();
            out = """
                  {
                    "exception" : "%s"
                  }
                  """;
            out = String.format(out, e.toString().replaceAll("\"", ""));
        }
        return Response.ok(out).build();        
    }
    
    @POST
    @Path("delate")
    @Produces(MediaType.APPLICATION_JSON)
    public Response delate(@QueryParam("id") @DefaultValue("0") int id){
        String out = null;        
        ControllerProducto cp = new ControllerProducto();
        Gson gson = new Gson();
        try{
            if(id<1)
                 out = "{\"error\": \"ID del producto no valido.\"}";
            else{
                cp.delete(id);
                out="""
                    {"result":"OK"}
                    """;
            }
            
        }
        catch (Exception e)
        {
            e.printStackTrace();
            out = """
                  {
                    "exception" : "%s"
                  }
                  """;
            out = String.format(out, e.toString().replaceAll("\"", ""));
        }
        return Response.ok(out).build();     
    }
} 