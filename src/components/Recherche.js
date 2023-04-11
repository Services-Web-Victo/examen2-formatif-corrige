import React from 'react';
import './Recherche.css';


class Recherche extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            niveau: 0
        }
    }

    niveauChange = (e) => this.setState({niveau : e.target.value});

    handleRecherche = (e) => {
        e.preventDefault();
        // Le combobox des classes
        const selectionClasse = document.getElementById('classe');
        // Le nom de la classe sélectionnée
        const classeSelect = selectionClasse.options[selectionClasse.selectedIndex].getAttribute('data-classe');
        // Le niveau 
        const niveau = document.getElementById('niveau').value

        this.props.rechercheSorts(classeSelect, niveau);
    }

    render() {
        

        const optionClasses = this.props.listeClasses.map((classe) => {
            return <option value={classe.id} data-classe={classe.nom} key={classe.id}>{classe.nom}</option>;
        })

        return (
            <form onSubmit={this.handleRecherche} id="form-recherche">
                Classe : 
                <select name="classe" id="classe">
                    {optionClasses}
                </select>

                Niveau : 
                <input type="number" name="niveau" id="niveau" min='0' max='9' value={this.state.niveau} onChange={this.niveauChange} />

                <input type="submit" value="Rechercher" />
            </form>
            
        );
    }
}

export default Recherche;