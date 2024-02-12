/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/JSP_Servlet/Servlet.java to edit this template
 */
package ServletConnexion;

import Admin.Admin;
import Commandes.Commande;
import Historique.Historique;
import Panier.Panier;
import Produits.Produit;
import Utilisateurs.Utilisateur;
import jakarta.servlet.http.HttpServlet;
import java.io.IOException;
import java.io.PrintWriter;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.BufferedReader;
import org.json.JSONObject;
import com.google.gson.Gson;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.Base64;
/**
 *
 * @author isi
 */
public class ServerSender extends HttpServlet {

    /**
     * Processes requests for both HTTP <code>GET</code> and <code>POST</code>
     * methods.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    protected void processRequest(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        
    }
@Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
    response.setContentType("application/json");
        
        String pathInfo = request.getPathInfo();
        // Determine the endpoint based on the path
        if (pathInfo == null) {
            response.getWriter().write("No endpoint specified");
        } else if (pathInfo.equals("/ajouterProduits")) {
            ajouterProduits(request,response);
        } else if (pathInfo.equals("/supprimerProduits")) {
            supprimerProduits(request,response);
        }else if (pathInfo.equals("/modifierProduits")) {
            modifierProduits(request,response);
        }else if (pathInfo.equals("/retournerProduits")) {
            retournerProduits(request,response);
        }else if (pathInfo.equals("/verifierUtil")) {
            verifierUtil(request,response);
        }else if (pathInfo.equals("/supprimerUtil")) {
            supprimerUtil(request,response);
        }else if (pathInfo.equals("/creerUtil")) {
            creerUtil(request,response);
        }else if (pathInfo.equals("/trouverCommande")) {
            trouverCommande(request,response);
        }else if (pathInfo.equals("/creerCommande")) {
            creerCommande(request,response);
        }else if (pathInfo.equals("/ajouterPanier")) {
            ajouterPanier(request,response);
        }else if (pathInfo.equals("/payerEnvoyeMail")) {
            payerEnvoyeMail(request,response);
        }else if (pathInfo.equals("/supprimerPanier")) {
            supprimerPanier(request,response);
        } else if (pathInfo.equals("/afficherPanier")) {
            afficherPanier(request,response);
        }else {
            response.getWriter().write("Unknown endpoint: " + pathInfo);
        }
    }
    
    private void retournerProduits(HttpServletRequest request, HttpServletResponse response)
        throws ServletException, IOException {
        ArrayList<Produit> sampleObject = Produit.retournerProduit();
        Gson gson = new Gson();
        String json = gson.toJson(sampleObject);
        response.getWriter().write(json);
        processRequest(request, response);
    }
    
    private void ajouterProduits(HttpServletRequest request, HttpServletResponse response)
        throws ServletException, IOException {
        BufferedReader reader = request.getReader();
        StringBuilder jsonBuffer = new StringBuilder();
        String line;
        while((line = reader.readLine()) != null){
                jsonBuffer.append(line);
        }
        
        JSONObject jsonObject = new JSONObject(jsonBuffer.toString());
        String taille = jsonObject.getString("taille");
        float prix = jsonObject.getFloat("prix");
        String marque = jsonObject.getString("marque");
        String description = jsonObject.getString("description");
        String couleur = jsonObject.getString("couleur");
        int quantite  = jsonObject.getInt("quantite");
        String saison = jsonObject.getString("saison");
        String nom = jsonObject.getString("nom");
        String image = jsonObject.getString("image");
        Produit prod = new Produit(taille,prix,marque,description,couleur,quantite,saison,nom,image);
        Admin.ajouterProduits(prod);
    }
    
    private void supprimerProduits(HttpServletRequest request, HttpServletResponse response)
        throws ServletException, IOException {
        BufferedReader reader = request.getReader();
        StringBuilder jsonBuffer = new StringBuilder();
        String line;
        while((line = reader.readLine()) != null){
                jsonBuffer.append(line);
        }
        
        JSONObject jsonObject = new JSONObject(jsonBuffer.toString());
        
        int product_Id = jsonObject.getInt("product_id");
        Admin.supprimerProduits(product_Id);
    }
    
    private void modifierProduits(HttpServletRequest request, HttpServletResponse response)
        throws ServletException, IOException {
        BufferedReader reader = request.getReader();
        StringBuilder jsonBuffer = new StringBuilder();
        String line;
        while((line = reader.readLine()) != null){
                jsonBuffer.append(line);
        }
        
        JSONObject jsonObject = new JSONObject(jsonBuffer.toString());
        int product_id = jsonObject.getInt("product_id");
        String taille = jsonObject.getString("taille");
        float prix = jsonObject.getFloat("prix");
        String marque = jsonObject.getString("marque");
        String description = jsonObject.getString("description");
        String couleur = jsonObject.getString("couleur");
        int quantite  = jsonObject.getInt("quantite");
        String saison = jsonObject.getString("saison");
        String nom = jsonObject.getString("nom");
        String image = jsonObject.getString("image");

        Produit prod = new Produit(product_id,taille,prix,marque,description,couleur,quantite,saison,nom,image);
        Admin.modifierProduit(prod);
        
    }
    private void verifierUtil(HttpServletRequest request, HttpServletResponse response)
        throws ServletException, IOException {
        BufferedReader reader = request.getReader();
        StringBuilder jsonBuffer = new StringBuilder();
        String line;
        while((line = reader.readLine()) != null){
                jsonBuffer.append(line);
        }
        
        JSONObject jsonObject = new JSONObject(jsonBuffer.toString());
        
        String email = jsonObject.getString("email");
        String pws = jsonObject.getString("password");
        Utilisateur sampleObject = Utilisateur.verifierUtilisateurs(email,pws);
        if(sampleObject.getEmail() == null){
            response.setStatus(HttpServletResponse.SC_NOT_FOUND);
            
        }else{
           Gson gson = new Gson();
            String json = gson.toJson(sampleObject);
            response.getWriter().write(json);
            processRequest(request, response); 
        }
    }
    
    private void supprimerUtil(HttpServletRequest request, HttpServletResponse response)
        throws ServletException, IOException {
        BufferedReader reader = request.getReader();
        StringBuilder jsonBuffer = new StringBuilder();
        String line;
        while((line = reader.readLine()) != null){
                jsonBuffer.append(line);
        }
        
        JSONObject jsonObject = new JSONObject(jsonBuffer.toString());
        
        int utilId = jsonObject.getInt("user_id");
        Utilisateur.supprimerUtilisateur(utilId);
        
    }
    
    private void creerUtil(HttpServletRequest request, HttpServletResponse response)
        throws ServletException, IOException {
        BufferedReader reader = request.getReader();
        StringBuilder jsonBuffer = new StringBuilder();
        String line;
        while((line = reader.readLine()) != null){
                jsonBuffer.append(line);
        }
        
        JSONObject jsonObject = new JSONObject(jsonBuffer.toString());
        
        String nom = jsonObject.getString("nom");
        String email = jsonObject.getString("email");
        String mp = jsonObject.getString("motDePasse");
        boolean pF = jsonObject.getBoolean("programmeFidelite");
        boolean admin = jsonObject.getBoolean("isAdmin");
        Utilisateur util = new Utilisateur(nom,email,mp,pF,admin);
        Utilisateur.creerUtilisateurs(util);
    }
    
    private void trouverCommande(HttpServletRequest request, HttpServletResponse response)
        throws ServletException, IOException {
        ArrayList<Commande> sampleObject = Historique.trouverCommande();
        Gson gson = new Gson();
        String json = gson.toJson(sampleObject);
        response.getWriter().write(json);
        processRequest(request, response);
    }
    
    private void creerCommande(HttpServletRequest request, HttpServletResponse response)
        throws ServletException, IOException {
        BufferedReader reader = request.getReader();
        StringBuilder jsonBuffer = new StringBuilder();
        String line;
        while((line = reader.readLine()) != null){
                jsonBuffer.append(line);
        }
        JSONObject jsonObject = new JSONObject(jsonBuffer.toString());
        
        int product_id = jsonObject.getInt("product_id");
        int user_id = jsonObject.getInt("user_id");
        int quantite = jsonObject.getInt("quantite");
        float prix = jsonObject.getFloat("prix");
        String date = jsonObject.getString("Command_date");
        try {
            SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
            Date dateObject = dateFormat.parse(date);
            Commande c = new Commande(product_id,user_id,quantite,prix,dateObject);
            Commande.CreerCommande(c);
            System.out.println("\n\n\n\n\n"+"INSIDE BREAKPOINT"+"\n\n\n\n\n");
        } catch (ParseException e) {
            e.printStackTrace();
        }
        
    }
    
    private void ajouterPanier(HttpServletRequest request, HttpServletResponse response)
        throws ServletException, IOException {
        BufferedReader reader = request.getReader();
        StringBuilder jsonBuffer = new StringBuilder();
        String line;
        while((line = reader.readLine()) != null){
                jsonBuffer.append(line);
        }
        JSONObject jsonObject = new JSONObject(jsonBuffer.toString());
        int product_id = jsonObject.getInt("product_id");
        int util_id = jsonObject.getInt("user_id");
        int quantite = jsonObject.getInt("quantite");
        float prix = jsonObject.getFloat("prix");
        Panier p = new Panier(product_id,util_id,quantite,prix);
        Panier.AjouterPanier(p);
    }
    private void payerEnvoyeMail(HttpServletRequest request, HttpServletResponse response)
        throws ServletException, IOException {
        
    }
    private void supprimerPanier(HttpServletRequest request, HttpServletResponse response)
        throws ServletException, IOException {
        BufferedReader reader = request.getReader();
        StringBuilder jsonBuffer = new StringBuilder();
        String line;
        while((line = reader.readLine()) != null){
                jsonBuffer.append(line);
        }
        JSONObject jsonObject = new JSONObject(jsonBuffer.toString());
        int user_id = jsonObject.getInt("user_id");
        int product_id = jsonObject.getInt("product_id");
        Panier.SupprimerPanier(product_id, user_id);
    }
    private void afficherPanier(HttpServletRequest request, HttpServletResponse response)
        throws ServletException, IOException {
        BufferedReader reader = request.getReader();
        StringBuilder jsonBuffer = new StringBuilder();
        String line;
        while((line = reader.readLine()) != null){
                jsonBuffer.append(line);
        }
        JSONObject jsonObject = new JSONObject(jsonBuffer.toString());
        int user_id = jsonObject.getInt("user_id");
        ArrayList<Panier> sampleObject = Panier.retournerPanier(user_id);
        Gson gson = new Gson();
        String json = gson.toJson(sampleObject);
        response.getWriter().write(json);
        processRequest(request, response);
    }
    
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        processRequest(request, response);
    }

    /**
     * Handles the HTTP <code>POST</code> method.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    

    /**
     * Returns a short description of the servlet.
     *
     * @return a String containing servlet description
     */
    @Override
    public String getServletInfo() {
        return "Short description";
    }// </editor-fold>

}
