/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package ConnectionBD;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.SQLException;

/**
 *
 * @author isi
 */
public class ConnectionBD {
    private static final String urlServeur = "jdbc:postgresql://localhost:5433/ProduitMagasin";
    private static final String identifiant = "postgres";
    private static final String motDePasse = "postgres";//postgres
    private static Connection connection = null;
    public static PreparedStatement connexion(String query) {
        PreparedStatement ps = null;
        try {
            Class.forName("org.postgresql.Driver"); // Load the PostgreSQL driver
            connection = DriverManager.getConnection(urlServeur, identifiant, motDePasse);
            ps = connection.prepareStatement(query);
            
        } catch (ClassNotFoundException e) {
            System.err.println("Error: PostgreSQL driver not found");
            e.printStackTrace();
        } catch (SQLException e) {
            System.err.println("Error: Failed to connect to the database");
            e.printStackTrace();
        }
        return ps;
    }
    public static void fermer(){
        try{
            if(connection != null){
            connection.close();
            }
        }
        catch(SQLException s){}
    }
    
    public static Connection getConnection(){
        return connection;
    }
}
