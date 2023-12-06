
const Home = () => {
    return (
        <>
        <div className="container">
            <div className="d-flex align-items-center justify-content-center">
                <h1 className="display-1 text-center">Rook Residencies</h1>
            </div>
            <div id="carouselExampleControls" className="carousel slide" data-ride="carousel">
                <div className="carousel-inner">
                    <div className="carousel-item active">
                        <img className="d-block w-100" src={require("../../images/chessimg.jpg")} alt="First slide" />
                    </div>
                    <div className="carousel-item">
                        <img className="d-block w-100" src={require("../../images/img2.jpg")} alt="Second slide" />
                    </div>
                    <div className="carousel-item">
                        <img className="d-block w-100" src={require("../../images/img3.jpg")} alt="Third slide" />
                    </div>
                </div>
                <a className="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="sr-only">Previous</span>
                </a>
                <a className="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="sr-only">Next</span>
                </a>
            </div>
            </div>
            <div className="d-flex align-items-center justify-content-center">
                <h1 className="display-1 text-center">Helping you make the right move.</h1>
            </div>
            <br />
            <br />
        </>
    );
 
};

export default Home;
