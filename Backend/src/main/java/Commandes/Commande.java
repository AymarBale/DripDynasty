/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package Commandes;

import ConnectionBD.ConnectionBD;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.util.Date;
/**
 *
 * @author isi
 */
public class Commande {
    private int command_id;
    private int product_id;
    private int user_id;
    private int quantite;
    private float prix;
    private Date command_date;


    public Commande(){}
    
    public Commande(int comId,int proId,int uId,int quantite,float prix,Date comD){
        this.command_id = comId;
        this.product_id = proId;
        this.user_id = uId;
        this.quantite = quantite;
        this.prix = prix;
        this.command_date = comD;
    }
    
    public Commande(int proId,int uId,int quantite,float prix,Date comD){
        
        this.product_id = proId;
        this.user_id = uId;
        this.quantite = quantite;
        this.prix = prix;
        this.command_date = comD;
    }

    /**
     * @return the Command_id
     */
    public int getCommand_id() {
        return command_id;
    }

    /**
     * @param command_id the id to set
     */
    public void setCommand_id(int command_id) {
        this.command_id = command_id;
    }
    
    /**
     * @return the product_id
     */
    public int getProduct_id() {
        return product_id;
    }

    /**
     * @param product_id the id to set
     */
    public void setProduct_id(int product_id) {
        this.product_id = product_id;
    }
    
     /**
     * @return the id
     */
    public int getUser_id() {
        return user_id;
    }

    /**
     * @param user_id the id to set
     */
    public void setUser_id(int user_id) {
        this.user_id = user_id;
    }
    
    /**
     * @return the quantite
     */
    public int getQuantite() {
        return quantite;
    }

    /**
     * @param quantite the id to set
     */
    public void setQuantite(int quantite) {
        this.quantite = quantite;
    }
    
    /**
     * @return the prix
     */
    public float getPrix() {
        return prix;
    }

    /**
     * @param prix the id to set
     */
    public void setPrix(float prix) {
        this.prix = prix;
    }
    
    /**
     * @return the Command_date
     */
    public Date getCommand_date() {
        return command_date;
    }

    /**
     * @param command_date the id to set
     */
    public void setCommand_date(Date command_date) {
        this.command_date = command_date;
    }
    
    public static void CreerCommande(Commande nouvelleCommande){
        String query = "INSERT INTO commandes (product_id, user_id, quantite, prix, Command_date) VALUES (?, ?, ?, ?, ?)";
        PreparedStatement preparedStatement = ConnectionBD.connexion(query);

        try {
            preparedStatement.setInt(1, nouvelleCommande.getProduct_id());
            preparedStatement.setInt(2, nouvelleCommande.getUser_id());
            preparedStatement.setInt(3, nouvelleCommande.getQuantite());
            preparedStatement.setDouble(4, nouvelleCommande.getPrix());
            preparedStatement.setDate(5, new java.sql.Date(nouvelleCommande.getCommand_date().getTime()));

            preparedStatement.executeUpdate();
        } catch (SQLException e) {
            e.printStackTrace();
        } finally {
            ConnectionBD.fermer();
        }
    }
}