const Footer = () => {
    return (
        <div className="footer-div">
        <footer>
                <p className="info"> 
                codeCave created by YR Limited 
                Copyright © 2024 </p>

                <a href="https://github.com/sarafuller2018/codeCave" 
                className="git-link" target="_blank" rel="noopener noreferrer">
                   View Source Code 
                </a>

                <button className="donate-btn" id="donateBtn">
                    Donate
                    <img src="/Images/coins-solid.svg" className="donate-icon" />
                </button>
        </footer>
        </div>
    );
};

export default Footer;