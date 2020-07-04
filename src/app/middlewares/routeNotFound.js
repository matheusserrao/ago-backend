const routeNotFound = (req, res) => {
    return res.status(404).json('Recurso não encontrado')
}

module.exports = routeNotFound