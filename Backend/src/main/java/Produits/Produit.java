/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package Produits;

import ConnectionBD.ConnectionBD;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;

/**
 *
 * @author isi
 */
public class Produit {
    private int product_id;
    private String taille;
    private float prix;
    private String marque;
    private String description;
    private String couleur;
    private int quantite;
    private String saison;
    private String nom;
    private String image;

    public Produit(int pId , String size,float price,String mq,
            String descript,String col,int quant,String season,String nom,String image) {
        this.product_id = pId;
        this.taille = size;
        this.prix = price;
        this.marque = mq;
        this.description = descript;
        this.couleur = col;
        this.quantite = quant;
        this.saison = season;
        this.nom = nom;
        this.image = image;
    }
    
    public Produit( String size,float price,String mq,
            String descript,String col,int quant,String season,String nom,String image) {
        
        this.taille = size;
        this.prix = price;
        this.marque = mq;
        this.description = descript;
        this.couleur = col;
        this.quantite = quant;
        this.saison = season;
        this.nom = nom;
        this.image = image;
    }

    public Produit() {
        
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
     * @return the taille
     */
    public String getTaille() {
        return taille;
    }

    /**
     * @param taille the id to set
     */
    public void setTaille(String taille) {
        this.taille = taille;
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
     * @return the marque
     */
    public String getMarque() {
        return marque;
    }

    /**
     * @param marque the id to set
     */
    public void setMarque(String marque) {
        this.marque = marque;
    }

    /**
     * @return the description
     */
    public String getDescription() {
        return description;
    }

    /**
     * @param description the id to set
     */
    public void setDescription(String description) {
        this.description = description;
    }

    /**
     * @return the couleur
     */
    public String getCouleur() {
        return couleur;
    }

    /**
     * @param couleur the id to set
     */
    public void setCouleur(String couleur) {
        this.couleur = couleur;
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
     * @return the saison
     */
    public String getSaison() {
        return saison;
    }

    /**
     * @param saison the id to set
     */
    public void setSaison(String saison) {
        this.saison = saison;
    }

    /**
     * @return the nom
     */
    public String getNom() {
        return nom;
    }

    /**
     * @param nom the id to set
     */
    public void setNom(String nom) {
        this.nom = nom;
    }
    
    /**
     * @return the image
     */
    public String getImage() {
        return image;
    }

    /**
     * @param image the id to set
     */
    public void setImage(String image) {
        this.image = image;
    }

    public static ArrayList<Produit> retournerProduit(){
        ArrayList<Produit> produits = new ArrayList<>();
        String query = "SELECT * FROM produits";
        PreparedStatement preparedStatement = ConnectionBD.connexion(query);
         
        try {
            ResultSet resultSet = preparedStatement.executeQuery();
            while (resultSet.next()) {
                Produit produit = new Produit();
                produit.setProduct_id(resultSet.getInt("product_id"));
                produit.setTaille(resultSet.getString("taille"));
                produit.setPrix(resultSet.getFloat("prix"));
                produit.setMarque(resultSet.getString("marque"));
                produit.setDescription(resultSet.getString("description"));
                produit.setCouleur(resultSet.getString("couleur"));
                produit.setQuantite(resultSet.getInt("quantite"));
                produit.setSaison(resultSet.getString("saison"));
                produit.setNom(resultSet.getString("nom"));
                produit.setImage(resultSet.getString("image"));
                produits.add(produit);
            }
       
        } catch (SQLException e) {
            e.printStackTrace();
        } finally {
            ConnectionBD.fermer();
        }
        return produits;
    }
}

