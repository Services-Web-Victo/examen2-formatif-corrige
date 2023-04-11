import React from 'react';
import Api from '../utils/Api';
import Carte from './Carte';
import Recherche from './Recherche';
import './GestionSort.css';


class GestionSort extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoaded : false, // Détermine si la liste des classes est terminé de charger
            listeClasses : [], // La liste des classes pour la selection dans le composante recherche.
            listeSorts : [] // La liste des sorts, le résultat de la recherche
        }
    }

    componentDidMount() {
        this.recupererClasse();
    }

    /**
     * Récupération de la liste des classes qui sera affichée dans la sélection de la recherche
     */
    recupererClasse = () => {
        Api({
            method: 'get',
            url: '/dnd/classe',
          })
          .then((reponse) => {
            const listeClasses = reponse.data;
            this.setState({ 
                listeClasses : listeClasses,
                isLoaded : true
            }); 
          });
    }

    selectionneListeSort = (classe, niveau) => {
        Api({
            method: 'GET',
            url : `/dnd/sorts/${classe}?niveau=${niveau}`
        })
        .then((reponse) => {
            const sorts = reponse.data.sorts;
            console.log(sorts)
            this.setState({listeSorts : sorts })
        });
    }

    ajouterFavori = (sortId) => {
        Api({
            method: 'POST',
            url: '/dnd/sorts/favori',
            data: {
                'sort_id' : sortId
            }
        })
        .then((reponse) => {
            console.log(reponse.data);
        })
    }

    supprimerFavori = (sortId) => {
        Api({
            method: 'DELETE',
            url: '/dnd/sorts/favori',
            data: {
                'sort_id' : sortId
            }
        })
        .then((reponse) => {
            console.log(reponse.data);
        })
    }

    render() {
        if(!this.state.isLoaded) {
            return(<h1>Chargement en cours...</h1>);
        }

        // Construction d'un tableau de composante Carte pour chaque sort de la liste des sorts
        const listesCarteSorts = this.state.listeSorts.map((sort) => {
            return (<Carte sort={sort} key={sort.id} ajouterFavori={this.ajouterFavori} supprimerFavori={this.supprimerFavori}/>)
        });

        return (
            <section className='gestion-sort'>
                <div className='entete-recherche'>
                    <h1 className='titre-page'>Grimoire de sorts</h1>
                    <Recherche listeClasses={this.state.listeClasses} rechercheSorts={this.selectionneListeSort}/>
                </div>

                <div className='liste-sort'>
                    {listesCarteSorts}
                </div>
                
            </section>
            
        );
    }
}

export default GestionSort;