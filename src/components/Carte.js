import React from 'react';
import './Carte.css';

class Carte extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            sortFavori : this.props.sort.favori
        }
    }

    changeFavori = (e) => {
        const estFavoris = e.target.getAttribute("data-favoris");

        if(estFavoris === "1") {
            this.setState({sortFavori : "0"});
            this.props.supprimerFavori(this.props.sort.id);
        } else {
            this.setState({sortFavori : "1"});
            this.props.ajouterFavori(this.props.sort.id);
        }
    }

    render() {

        let iconeFavori = <i className="far fa-heart fa-2x carte-favoris" data-favoris="0" onClick={this.changeFavori}></i>;
        if (this.state.sortFavori === "1"){
            iconeFavori = <i className="fas fa-heart fa-2x carte-favoris" data-favoris="1" onClick={this.changeFavori}></i>
        }
        
        const sort = this.props.sort;
        let composantes = sort.verbal === "1" ? "V, " : "";
        composantes += sort.somatic === "1" ? "S, " : "";
        composantes += sort.material === "1" ? "M" : "";
        composantes += sort.material_cost !== "" ? " (" + sort.material_cost + ")" : "";
        composantes = composantes.substring(composantes.length-2) === ", " ? composantes.substring(0, composantes.length-2) : composantes;

        const listeClasses = sort.classe.split(",");
        const listeBoutonClasses = listeClasses.map((classe) => {
            return (<div className='carte-classe' key={classe}>{classe}</div>);
        })

        return (
            <div className='carte-sort'>
                <div className='carte-titre'>
                    <h2 className='carte-nom'>{this.props.sort.name}</h2>
                    {iconeFavori}
                </div>
                
                <div className='carte-ecole'>
                    <i>niveau {sort.level} - {this.props.sort.school}</i>
                </div>

                <div><strong>Temps d'incantation</strong> : {this.props.sort.cast_time}</div>
                <div><strong>Portée</strong> : {this.props.sort.range}</div>
                <div><strong>Composantes</strong> : {composantes}</div>
                <div><strong>Durée</strong> : {this.props.sort.duration}</div>
                <div className='carte-description'>{this.props.sort.description}</div>

                <div className='carte-liste-classe'>{listeBoutonClasses}</div>
            </div>
        );
    }
}

export default Carte;