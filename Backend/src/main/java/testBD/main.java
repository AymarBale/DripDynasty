/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package testBD;

import Admin.Admin;
import Commandes.Commande;
import Historique.Historique;
import Panier.Panier;
import Produits.Produit;
import Utilisateurs.Utilisateur;
import java.io.IOException;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

/**
 *
 * @author isi
 */
public class main {
    public static void main(String[] args) throws IOException{
        Panier.AjouterPanier(new Panier(60,1,3, (float) 49.5));
        
        
    }
}
