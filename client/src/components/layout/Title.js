import React from 'react'

const Title = () => {
    const styles = getStyles()
  return (
    <h1 style={styles.title}>
      PEOPLE AND THEIR CARS
    </h1>
  )
}

const getStyles = () => ({
    title: {
        marginTop: '40px',
        margin: '40px 20px 0 20px',
        paddingBottom: '50px',
        textAlign: 'center',
        borderBottom: '1px solid gainsboro'
    }
})

export default Title
