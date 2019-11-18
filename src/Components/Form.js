import React, { Component } from 'react'
import './Form.css'

export default class Form extends Component {

    state = {
        title : 'Avatar',
        poster: 'https://images-na.ssl-images-amazon.com/images/I/41zWyLXIetL.jpg',
        comment: 'Another blockbuster with nice blue aliens'
    }

    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
          });
    }


    submitForm= (e) => {
        e.preventDefault();

        const config = {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(this.state),
          };
    
        const url = "https://post-a-form.herokuapp.com/api/movies/";

        fetch(url, config)
        .then(res => res.json())
        .then(res => {
            if (res.error) {
                alert(res.error);
            } else {
                console.log(res)
                alert(`film ajouté avec l'ID ${res.id}!`);
            }
         }).catch(e => {
        console.error(e);
         alert('Erreur lors de l\'ajout d\'un film');
        });

    }

    render() {
        return (
            <div>
                <form id="movie-form" onSubmit={this.submitForm}>
                    <input type="text" id="title" name="title" onChange={this.onChange} value={this.state.title} required='required'/>
                    <input type="text" id="poster" name="poster" onChange={this.onChange} value={this.state.poster} required='required'/>
                    <textarea id="comment" name="comment"onChange={this.onChange} value={this.state.comment} required='required'/>
                    <input type="submit" id="submit-movie" value="send" />
                </form>
            </div>
        )
    }
}
