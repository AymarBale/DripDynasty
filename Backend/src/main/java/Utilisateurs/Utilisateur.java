/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package Utilisateurs;

import ConnectionBD.ConnectionBD;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
/**
 *
 * @author isi
 */
public class Utilisateur {
    private int user_id;
    private String nom;
    private String email;
    private String motDePasse;
    private boolean programmeFidelite;
    private boolean isAdmin;


    public Utilisateur(){}
    public Utilisateur(String no,String em,String mp,boolean pF,boolean admin){
        
        this.nom = no;
        this.email = em;
        this.motDePasse = mp;
        this.programmeFidelite = pF;
        this.isAdmin = admin; 
    }
    public Utilisateur(int uId,String no,String em,String mp,boolean pF,boolean admin){
        this.user_id = uId;
        this.nom = no;
        this.email = em;
        this.motDePasse = mp;
        this.programmeFidelite = pF;
        this.isAdmin = admin; 
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
     * @return the email
     */
    public String getEmail() {
        return email;
    }

    /**
     * @param email the id to set
     */
    public void setEmail(String email) {
        this.email = email;
    }
    
    /**
     * @return the motDePasse
     */
    public String getMotDePasse() {
        return motDePasse;
    }

    /**
     * @param motDePasse the id to set
     */
    public void setMotDePasse(String motDePasse) {
        this.motDePasse = motDePasse;
    }
    
    /**
     * @return the programmeFidelite
     */
    public boolean getProgrammeFidelite() {
        return programmeFidelite;
    }

    /**
     * @param programmeFidelite the id to set
     */
    public void setProgrammeFidelite(boolean programmeFidelite) {
        this.programmeFidelite = programmeFidelite;
    }
    
    /**
     * @return the isAdmin
     */
    public boolean getIsAdmin() {
        return isAdmin;
    }

    /**
     * @param isAdmin the id to set
     */
    public void setIsAdmin(boolean isAdmin) {
        this.isAdmin = isAdmin;
    }
    
    public static Utilisateur verifierUtilisateurs(String email, String motdepasse) {
        Utilisateur unUtilisateur = null;
        String query = "SELECT * FROM utilisateurs WHERE email=? AND motdepasse=?";
        PreparedStatement preparedStatement = ConnectionBD.connexion(query);

        try {
            preparedStatement.setString(1, email);
            preparedStatement.setString(2, motdepasse);

            ResultSet resultSet = preparedStatement.executeQuery();
            if (resultSet.next()) {
                unUtilisateur = new Utilisateur();
                unUtilisateur.setUser_id(resultSet.getInt("user_id"));
                unUtilisateur.setNom(resultSet.getString("nom"));
                unUtilisateur.setEmail(resultSet.getString("email"));
                unUtilisateur.setMotDePasse(resultSet.getString("motdepasse"));
                unUtilisateur.setProgrammeFidelite(resultSet.getBoolean("programmefidelite"));
                unUtilisateur.setIsAdmin(resultSet.getBoolean("isadmin"));
            }

        } catch (SQLException e) {
            e.printStackTrace();
        } finally {
            ConnectionBD.fermer();
        }
        return unUtilisateur;
    }
    
    public static void supprimerUtilisateur(int user_id) {
        String query = "DELETE FROM utilisateurs WHERE user_id=?";
        PreparedStatement preparedStatement = ConnectionBD.connexion(query);

        try {
            preparedStatement.setInt(1, user_id);
            preparedStatement.executeUpdate();
        } catch (SQLException e) {
            e.printStackTrace();
        } finally {
            ConnectionBD.fermer();
        }
    }
    
    public static void creerUtilisateurs(Utilisateur nouveauUtilisateur) {
        String query = "INSERT INTO utilisateurs (nom, email, motdepasse, programmefidelite, isadmin) VALUES (?, ?, ?, ?, ?)";
        PreparedStatement preparedStatement = ConnectionBD.connexion(query);

        try {
            preparedStatement.setString(1, nouveauUtilisateur.getNom());
            preparedStatement.setString(2, nouveauUtilisateur.getEmail());
            preparedStatement.setString(3, nouveauUtilisateur.getMotDePasse());
            preparedStatement.setBoolean(4, nouveauUtilisateur.getProgrammeFidelite());
            preparedStatement.setBoolean(5, nouveauUtilisateur.getIsAdmin());

            preparedStatement.executeUpdate();
        } catch (SQLException e) {
            e.printStackTrace();
        } finally {
            ConnectionBD.fermer();
        }
    }
    
}