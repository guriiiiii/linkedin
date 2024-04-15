import React from 'react'
import "./Widgets.css"
import { Info, FiberManualRecord } from '@mui/icons-material'

function Widgets() {
    const newsArticle = (heading, subtitle) => (
        <div className="widgets__article">
            <div className="widgets__articleLeft">
                <FiberManualRecord />
            </div>
            <div className="widgets__articleRight">
                <h4>{heading}</h4>
                <p>{subtitle}</p>
            </div>
        </div>
    );

    return (
        <div className="widgets">
            <div className="widgets__header">
                <h2>LinkedIn News</h2>
                <Info />
            </div>

            {newsArticle("The Full Stack Junkie Is Back", "Top news - 9099 readers")}
            {newsArticle("Coronavirus: UK updates", "Top news - 886 readers")}
            {newsArticle("Bitcoin Breaks $22K", "Crypto - 8000 readers")}
            {newsArticle("JavaScript Mastery", "Code - 120000 readers")}
            {newsArticle("Tesla hits new highs", "Cars & auto - 300 readers")}
        </div>
    )
}

export default Widgets
