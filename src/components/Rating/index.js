import { Component } from 'react';
import Icon from '@mdi/react';
import { mdiStar, mdiStarHalfFull, mdiStarOutline } from '@mdi/js';
import './rating.css';

class Rating extends Component {
    constructor(props) {
        super(props);
        this.state = {
            numero: this.props.estrelas,
        }
        this.stars = (this.state.numero / 2)
        this.fullStars = Math.floor(this.state.numero / 2)
        this.emptyStars = Math.floor(5 - (this.stars))
        this.partialStars = (this.stars - this.fullStars)

    }

    render() {
        let arrFullStars = [];
        let arrEmptyStars = [];
        let arrPartialStars = [];

        for (let i = 0; i < this.fullStars; i++) {
            arrFullStars.push((i));
        }
        if (this.partialStars >= 0.3 && this.partialStars <= 0.7) {
            for (let i = 0; i < this.partialStars; i++) {
                arrPartialStars.push((5));
            }
        } else if (this.partialStars > 0.7) {
            for (let i = 0; i < this.partialStars; i++) {
                arrFullStars.push((5));
            }
        } else if (this.partialStars < 0.3) {
            for (let i = 0; i < this.partialStars; i++) {
                arrEmptyStars.push((5));
            }
        }

        for (let i = 0; i < this.emptyStars; i++) {
            arrEmptyStars.push((i));
        }

        return (
            <div>
                <div className='rating-stars'>
                    {arrFullStars.map((index) => {
                        return (
                            <div key={index}>
                                <Icon path={mdiStar} size={1} className='icon_star' />
                            </div>
                        )
                    })}
                    {arrPartialStars.map((index) => {
                        return (
                            <div key={index}>
                                <Icon path={mdiStarHalfFull} size={1} className='icon_star' />
                            </div>
                        )
                    })}
                    {arrEmptyStars.map((index) => {
                        return (
                            <div key={index}>
                                <Icon path={mdiStarOutline} size={1} className='icon_star' />
                            </div>
                        )
                    })}
                </div>
            </div>
        );
    }
}

export default Rating;