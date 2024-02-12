/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package Admin;

import ConnectionBD.ConnectionBD;
import Produits.Produit;
import java.sql.PreparedStatement;
import java.sql.SQLException;
/**
 *
 * @author isi
 */
public class Admin {
    public static void ajouterProduits(Produit nouveauProduit) {
        String query = "INSERT INTO produits (taille, prix, marque, description, couleur, quantite, saison, nom, image) " +
                   "VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";
        PreparedStatement preparedStatement = ConnectionBD.connexion(query);

        try {
            preparedStatement.setString(1, nouveauProduit.getTaille());
            preparedStatement.setFloat(2, nouveauProduit.getPrix());
            preparedStatement.setString(3, nouveauProduit.getMarque());
            preparedStatement.setString(4, nouveauProduit.getDescription());
            preparedStatement.setString(5, nouveauProduit.getCouleur());
            preparedStatement.setInt(6, nouveauProduit.getQuantite());
            preparedStatement.setString(7, nouveauProduit.getSaison());
            preparedStatement.setString(8, nouveauProduit.getNom());
            preparedStatement.setString(9, nouveauProduit.getImage());

            preparedStatement.executeUpdate();
        } catch (SQLException e) {
            e.printStackTrace();
        } finally {
            ConnectionBD.fermer();
        }
    }
    
    public static void supprimerProduits(int productId) {
        String query = "DELETE FROM produits WHERE product_id=?";
        PreparedStatement preparedStatement = ConnectionBD.connexion(query);

        try {
            preparedStatement.setInt(1, productId);
            preparedStatement.executeUpdate();
        } catch (SQLException e) {
            e.printStackTrace();
        } finally {
            ConnectionBD.fermer();
        }
    }

    
    public static void modifierProduit(Produit produitModifie) {
        String query = "UPDATE produits SET taille=?, prix=?, marque=?, description=?, couleur=?, quantite=?, saison=?, nom=?, image=? " +
                       "WHERE product_id=?";
        PreparedStatement preparedStatement = ConnectionBD.connexion(query);

        try {
            preparedStatement.setString(1, produitModifie.getTaille());
            preparedStatement.setFloat(2, produitModifie.getPrix());
            preparedStatement.setString(3, produitModifie.getMarque());
            preparedStatement.setString(4, produitModifie.getDescription());
            preparedStatement.setString(5, produitModifie.getCouleur());
            preparedStatement.setInt(6, produitModifie.getQuantite());
            preparedStatement.setString(7, produitModifie.getSaison());
            preparedStatement.setString(8, produitModifie.getNom());
            preparedStatement.setString(9, produitModifie.getImage());
            preparedStatement.setInt(10, produitModifie.getProduct_id());

            preparedStatement.executeUpdate();
        } catch (SQLException e) {
            e.printStackTrace();
        } finally {
            ConnectionBD.fermer();
        }
    }
}
