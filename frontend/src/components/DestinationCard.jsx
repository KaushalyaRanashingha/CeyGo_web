import React from 'react'
import { motion } from 'framer-motion'

export function DestinationCard({ image, title, location, description, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.8, delay, ease: 'easeOut' }}
      className="destination-card"
    >
      <div className="destination-image-wrapper">
        <motion.img
          src={image}
          alt={title}
          className="destination-image"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
        />
      </div>
      <div className="destination-content">
        <span className="destination-location">{location}</span>
        <h3 className="destination-title">{title}</h3>
        <p className="destination-description">{description}</p>
        <div className="destination-underline"></div>
      </div>
    </motion.div>
  )
}
