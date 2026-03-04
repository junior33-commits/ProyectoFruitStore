
package com.utl.fruitstore.controller;

import com.utl.fruitstore.db.ConexionMySQL;
import java.util.List;
import com.utl.fruitstore.model.Vendedor;
import java.sql.ResultSet;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.util.ArrayList;

/**
 *
 * @author LiveGrios
 */
public class ControllerVendedor
{
    public List<Vendedor> getAll(String filtro) throws Exception
    {
        String sql = "SELECT * FROM v_vendedor ORDER BY nombre ASC";
        ConexionMySQL connMySQL = new ConexionMySQL();
        Connection conn = connMySQL.open();
        PreparedStatement pstmt = conn.prepareStatement(sql);
        ResultSet rs = pstmt.executeQuery();
        List<Vendedor> vendedores = new ArrayList<>();
        
        while(rs.next())
            vendedores.add(fill(rs));
        
        rs.close();
        pstmt.close();
        conn.close();
        
        return vendedores;
    }
    
    private Vendedor fill(ResultSet rs) throws Exception
    {
        Vendedor v = new Vendedor();
        
        v.setCalle(rs.getString("calle"));
        v.setCiudad(rs.getString("ciudad"));
        v.setColonia(rs.getString("colonia"));
        v.setCp(rs.getString("cp"));
        v.setEmail(rs.getString("email"));
        v.setEstado(rs.getString("estado"));
        v.setEstatus(rs.getInt("estatus"));
        v.setFechaAlta(rs.getString("fechaAlta"));
        v.setFechaNacimiento(rs.getString("fechaNac"));
        v.setGenero(rs.getString("genero"));
        v.setId(rs.getInt("idVendedor"));
        v.setNombre(rs.getString("nombre"));
        v.setNumExt(rs.getString("numExt"));
        v.setNumInt(rs.getString("numInt"));
        v.setPais(rs.getString("pais"));
        v.setTelefono(rs.getString("telefono"));
        return v;
    }
}
