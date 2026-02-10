# Angular-stock-price-predictor
A full-stack application that predicts future stock prices using machine learning and visualizes results using Angular.

# 📈 Stock Price Prediction Web App

An end-to-end **Stock Price Prediction application** built using **Angular** for the frontend and **Machine Learning API** for backend predictions.

##  Features
- Predict future stock prices based on historical data
- Interactive line chart visualization
- User inputs stock ticker and prediction days
- Real-time API integration
- Clean and responsive UI

##  Tech Stack
**Frontend**
- Angular
- TypeScript
- Chart.js
- HTML, CSS

**Backend**
- Python
- FastAPI 
- Machine Learning (Regression / LSTM)

## 📊 Demo Screenshot
![Dashboard](https://github.com/alexsteven311-design/angular-stock-price-predictor/blob/main/Prediction-chart.png?raw=true)

##  How It Works
1. User enters stock symbol (e.g., AAPL)
2. Selects number of days for prediction
3. Angular sends request to backend API
4. ML model predicts prices
5. Results displayed in interactive chart

## ▶️ Run Locally

### Frontend
```bash
cd frontend
npm install
ng serve
