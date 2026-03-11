/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.utl.fruitstore.rest;
import com.google.gson.Gson;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.QueryParam;
import jakarta.ws.rs.DefaultValue;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import com.utl.fruitstore.controller.ControllerVendedor;
import com.utl.fruitstore.model.Vendedor;
import jakarta.ws.rs.FormParam;
import jakarta.ws.rs.POST;
import java.util.List;

/**
 *
 * @author DELL
 */
@Path("vendedor")
public class RESTVendedor {
    @GET
    @Path("getAll")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getAll(@QueryParam("filtro") @DefaultValue("")String filtro){
        String out = null; 
        List<Vendedor> vendedores = null;
        ControllerVendedor cv = new ControllerVendedor();
        Gson gson = new Gson();
        try{
            vendedores = cv.getAll(filtro);
            out = gson.toJson(vendedores);
        }
        catch(Exception e){
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
    public Response save(@FormParam("vendedor") String datosVendedor){
        System.out.println(datosVendedor);
        String out = null;
        ControllerVendedor cv = new ControllerVendedor();
        Gson gson = new Gson();
        Vendedor v = null;
        try{
            v = gson.fromJson(datosVendedor, Vendedor.class);
            if(v == null){
                out = "{\"error\": \"No hay datos del vendedor\"}";
            }
            else{
                if(v.getId() == 0){
                    cv.insert(v);
                }
                else 
                    cv.update(v);
                out = new Gson().toJson(v);
            }
        }
        catch(Exception e){
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
    @Path("delete")
    @Produces(MediaType.APPLICATION_JSON)
    public Response delete(@FormParam("id") @DefaultValue("0") int id){
        String out = null;
        ControllerVendedor cv = new ControllerVendedor();
        Gson gson = new Gson();
        try {
            if(id < 1)
                out = "{\"error\": \"ID no valido.\"}";
            else{
                cv.delete(id);
                out = """
                      {"result":"OK"}
                      """;
            }
        }
        catch(Exception e){
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