
//      RECUPERATION DES ELEMENTS
var resetBtn = document.getElementById("reset");
var scoreJoueur = document.getElementById("score-joueur");
var scoreOrdinateur = document.getElementById("score-ordinateur");
var btnJoueur = [...document.getElementsByClassName("btn-joueur")];//ici a cause des trois points la copie se fait sous forme de tableaux
var opierreBtn = document.getElementById("opierre");
var ofeuilleBtn = document.getElementById("ofeuille");
var ociseauxBtn = document.getElementById("ociseaux");
var message = document.getElementById("message");
var nextBtn = document.getElementById("next");



const jouerManche = (e) => {//Le e represente l'evenement produit
  let choix = e.target.closest(".btn-joueur");//target cible l'elemnt qui a ete cile
  //closest lui determine l'element le plus pres.donc peut importe
  //ou l'on clique on sekectionne l'in d'un button  

  //permet de desactiver tout les buttons lorqu'on cliques sur un
  btnJoueur.forEach((btn) => {
    btn.classList.add("desactivated");
    btn.removeEventListener("click", jouerManche);//car une fois le buttons cliques on peut plus cliquer
  });

  choix.classList.remove("desactivated");
  choix.classList.add("active");

  var choixJoueur = choix.id;
  var choixOrdi = faireChoixOridnateur();

  verifierGagnant(choixJoueur, choixOrdi);

  nextBtn.style.visibility = "visible";
};



const PIERRE = "pierre";
const FEUILLE = "feuille";
const CISEAUX = "ciseaux";



const faireChoixOridnateur = () => {
  // 0 = pierre
  // 1 = feuille
  // 2 = ciseaux

  
  let nbAleatoire = Math.floor(Math.random() * 3);

  switch (nbAleatoire) {
    case 0:
      opierreBtn.classList.add("active");
      return PIERRE;
    case 1:
      ofeuilleBtn.classList.add("active");
      return FEUILLE;
    default:
      ociseauxBtn.classList.add("active");
      return CISEAUX;
  }
};

const verifierGagnant = (choixJoueur, choixOrdi) => {
  if (choixJoueur == choixOrdi) {
    message.textContent = "Egalité !";
    return;
  }

  if (choixJoueur == PIERRE) {
    if (choixOrdi == FEUILLE) {
      return victoireOrdinateur();
    } else if (choixOrdi == CISEAUX) {
      return victoireJoueur();
    }
  }

  if (choixJoueur == FEUILLE) {
    if (choixOrdi == CISEAUX) {
      return victoireOrdinateur();
    } else if (choixOrdi == PIERRE) {
      return victoireJoueur();
    }
  }

  if (choixJoueur == CISEAUX) {
    if (choixOrdi == PIERRE) {
      return victoireOrdinateur();
    } else if (choixOrdi == FEUILLE) {
      return victoireJoueur();
    }
  }
};

const victoireOrdinateur = () => {
  message.textContent = "L'ordinateur gagne...";
  scoreOrdinateur.textContent++;
};

const victoireJoueur = () => {
  message.textContent = "Vous avez gagné !!!! ";
  scoreJoueur.textContent++;
};

const preparerNouvelleManche = () => {
  btnJoueur.forEach((btn) => {
    btn.classList.remove("desactivated");
    btn.classList.remove("active");

    btn.addEventListener("click", jouerManche);
  });

  nextBtn.style.visibility = "hidden";

  opierreBtn.classList.remove("active");
  ofeuilleBtn.classList.remove("active");
  ociseauxBtn.classList.remove("active");

  message.textContent = "A vous de jouer !";
};

resetBtn.addEventListener("click", () => {
  scoreJoueur.textContent = 0;
  scoreOrdinateur.textContent = 0;

  preparerNouvelleManche();
});

nextBtn.addEventListener("click", preparerNouvelleManche);

//Donc ici pour chaque boutton du joueur un lui ecoute un evenememt 
btnJoueur.forEach((btn) => btn.addEventListener("click", jouerManche));


