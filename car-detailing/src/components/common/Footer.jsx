import { Box, Typography, Container } from "@mui/material";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: "#1f1f1f",
        color: "#d4af37",
        py: 5,
        textAlign: "center",
        boxShadow: "0px -10px 20px rgba(212, 175, 55, 0.3)",
        width: "100%",
        mt: "auto", 
      }}
    >
      <Container maxWidth="lg">
        <Typography variant="body2" sx={{ mb: 2 }}>
          &copy; {new Date().getFullYear()} ProDetailing. Wszystkie prawa
          zastrzeżone.
        </Typography>
        <Box sx={{ display: "flex", justifyContent: "center", gap: 2 }}>
          <Link
            to="/privacy-policy"
            style={{
              textDecoration: "none",
              color: "#d4af37",
              fontWeight: "bold",
              fontSize: "0.9rem",
              transition: "color 0.3s ease-in-out",
            }}
            onMouseEnter={(e) => (e.target.style.color = "#fff")}
            onMouseLeave={(e) => (e.target.style.color = "#d4af37")}
          >
            Polityka prywatności
          </Link>
          |
          <Link
            to="/terms-of-service"
            style={{
              textDecoration: "none",
              color: "#d4af37",
              fontWeight: "bold",
              fontSize: "0.9rem",
              transition: "color 0.3s ease-in-out",
            }}
            onMouseEnter={(e) => (e.target.style.color = "#fff")}
            onMouseLeave={(e) => (e.target.style.color = "#d4af37")}
          >
            Warunki użytkowania
          </Link>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
