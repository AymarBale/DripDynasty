/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package Historique;


import Commandes.Commande;
import ConnectionBD.ConnectionBD;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;

/**
 *
 * @author isi
 */
public class Historique {
    public static ArrayList<Commande> trouverCommande(){
    ArrayList<Commande> commandList = new ArrayList<>();
        String query = "SELECT * FROM Commandes";
        PreparedStatement preparedStatement = ConnectionBD.connexion(query);
         
        try {
            ResultSet resultSet = preparedStatement.executeQuery();
            while (resultSet.next()) {
                Commande command = new Commande();
                command.setProduct_id(resultSet.getInt("product_id"));
                command.setUser_id(resultSet.getInt("user_id"));
                command.setQuantite(resultSet.getInt("quantite"));
                command.setPrix(resultSet.getFloat("prix"));
                command.setCommand_date(resultSet.getDate("Command_date"));
                command.setCommand_id(resultSet.getInt("Command_id"));
                commandList.add(command);
            }
       
        } catch (SQLException e) {
            e.printStackTrace();
        } finally {
            ConnectionBD.fermer();
        }
        return commandList;
    }
}
