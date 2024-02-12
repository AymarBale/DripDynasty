/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package Panier;

import ConnectionBD.ConnectionBD;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
/**
 *
 * @author isi
 */
public class Panier {
     private int product_id;
    private int user_id;
    private int quantite;
    private float prix;


    public Panier(){}
    public Panier(int product_id,int user_id,int quantite,float prix ){
        this.product_id = product_id;
        this.user_id = user_id;
        this.quantite = quantite;
        this.prix = prix;
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
     * @return the user_id
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
    
    public static void AjouterPanier(Panier panier) {
        String selectQuery = "SELECT quantite, prix FROM panier WHERE product_id = ? AND user_id = ?";
        String updateQuery = "UPDATE panier SET quantite = ?, prix = ? WHERE product_id = ? AND user_id = ?";
        String insertQuery = "INSERT INTO panier (product_id, user_id, quantite, prix) VALUES (?, ?, ?, ?)";

        int ancienneQuantite = 0;
        float ancienPrix = 0;

        PreparedStatement selectStatement = ConnectionBD.connexion(selectQuery);
        try {
            selectStatement.setInt(1, panier.getProduct_id());
            selectStatement.setInt(2, panier.getUser_id());
            ResultSet resultSet = selectStatement.executeQuery();
            if (resultSet.next()) {
                ancienneQuantite = resultSet.getInt("quantite");
                ancienPrix = resultSet.getFloat("prix");
            }
        } catch (SQLException e) {
            e.printStackTrace();
        } finally {
            ConnectionBD.fermer();
        }

        if (ancienneQuantite > 0) {
            PreparedStatement updateStatement = ConnectionBD.connexion(updateQuery);
            try {
                float nouveauPrix = (panier.getQuantite() * panier.getPrix()) + ancienPrix;
                updateStatement.setInt(1, panier.getQuantite() + ancienneQuantite);
                updateStatement.setFloat(2, nouveauPrix);
                updateStatement.setInt(3, panier.getProduct_id());
                updateStatement.setInt(4, panier.getUser_id());
                updateStatement.executeUpdate();
            } catch (SQLException e) {
                e.printStackTrace();
            } finally {
                ConnectionBD.fermer();
            }
        } else {
            PreparedStatement insertStatement = ConnectionBD.connexion(insertQuery);
            try {
                float nouveauPrix = panier.getQuantite() * panier.getPrix();
                insertStatement.setInt(1, panier.getProduct_id());
                insertStatement.setInt(2, panier.getUser_id());
                insertStatement.setInt(3, panier.getQuantite());
                insertStatement.setFloat(4, nouveauPrix);
                insertStatement.executeUpdate();
            } catch (SQLException e) {
                e.printStackTrace();
            } finally {
                ConnectionBD.fermer();
            }
        }
    }



    public static void SupprimerPanier(int product_id, int user_id) {
        String query = "DELETE FROM panier WHERE product_id = ? AND user_id = ?";
        PreparedStatement preparedStatement = ConnectionBD.connexion(query);
        
        try{
            preparedStatement.setInt(1, product_id);
            preparedStatement.setInt(2, user_id);
            preparedStatement.executeUpdate();
            
        } catch (SQLException e) {
            e.printStackTrace();
        }finally {
            ConnectionBD.fermer();
        }
    }
    
    public static ArrayList<Panier> retournerPanier(int user_id) {
        ArrayList<Panier> monPanier = new ArrayList<>();
        String query = "SELECT * FROM panier WHERE user_id = ?";
        PreparedStatement preparedStatement = ConnectionBD.connexion(query);

        try {
            preparedStatement.setInt(1, user_id);

            ResultSet resultSet = preparedStatement.executeQuery();
            while (resultSet.next()) {
                Panier panier = new Panier();
                panier.setProduct_id(resultSet.getInt("product_id"));
                panier.setUser_id(resultSet.getInt("user_id"));
                panier.setQuantite(resultSet.getInt("quantite"));
                panier.setPrix(resultSet.getFloat("prix"));
                monPanier.add(panier);
            }

        } catch (SQLException e) {
            e.printStackTrace();
        } finally {
            ConnectionBD.fermer();
        }
        return monPanier;
    }
}
