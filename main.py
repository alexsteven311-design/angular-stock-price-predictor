from fastapi import FastAPI
from pydantic import BaseModel
from typing import List
import yfinance as yf
import pandas as pd
from sklearn.linear_model import LinearRegression
import datetime
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:4200"],  # Angular app URL
    allow_credentials=True,
    allow_methods=["*"],  # allow GET, POST, OPTIONS, etc.
    allow_headers=["*"],
)

class PredictionRequest(BaseModel):
    ticker: str
    days: int = 5

class PredictionResponse(BaseModel):
    dates: List[str]
    prices: List[float] 

@app.post("/predict", response_model=PredictionResponse)
def predict_price(req: PredictionRequest):
    ticker = yf.Ticker(req.ticker)
    df = ticker.history(period="60d")
    df = df.reset_index()
    df["Day"] = (df["Date"] - df["Date"].min()).dt.days

    model = LinearRegression()
    model.fit(df[["Day"]], df["Close"])

    last_day = df["Day"].max()
    predictions = []
    dates = []

    for i in range(1, req.days + 1):
        next_day = last_day + i
        next_date = df["Date"].max() + datetime.timedelta(days=i)
        pred_price = float(model.predict([[next_day]])[0])
        predictions.append(pred_price)
        dates.append(next_date.strftime('%Y-%m-%d'))

    return PredictionResponse(dates=dates, prices=predictions)