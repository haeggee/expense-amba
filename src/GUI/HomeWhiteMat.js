/**
 *
 * This file was generated with Adobe XD React Exporter
 * Exporter for Adobe XD is written by: Johannes Pichler <j.pichler@webpixels.at>
 *
 **/

import React from "react"
import {makeStyles} from "@material-ui/core"

const useStyle = makeStyles(()=>({
    mat: {
        position: 'absolute',
        top: '0px',
        left: '0px'
    }
}))

const HomeWhiteMat = () => {

    const classes = useStyle()

    return (
    <div>
        <svg width={'100%'} height={'100%'} className={classes.mat}>
            <defs>
                <style>{".whiteMat{fill:url(#whiteMat);}"}</style>
                <linearGradient
                    id="whiteMat"
                    x1={0.5}
                    x2={0.5}
                    y2={1}
                    gradientUnits="objectBoundingBox"
                >
                    <stop offset={0} stopColor="#f5f5f5" stopOpacity={0}/>
                    <stop offset={0.9} stopColor="#fff"/>
                    <stop offset={1} stopColor="#fff"/>
                </linearGradient>
            </defs>
            <rect className="whiteMat" width={'100%'} height={'100%'}/>
        </svg>
    </div>
)}

export default HomeWhiteMat
