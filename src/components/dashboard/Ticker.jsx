"use client";

import React, { useEffect, useRef, memo } from "react";

function TradingViewWidget() {
    const container = useRef();

    useEffect(() => {
        if (!container.current) return;

        const script = document.createElement("script");
        script.src = "https://s3.tradingview.com/external-embedding/embed-widget-ticker-tape.js";
        script.type = "text/javascript";
        script.async = true;
        script.innerHTML = `{
            "symbols": [
                {"proName": "OANDA:XAUUSD", "title": "GOLD / USD"},
                {"proName": "OANDA:XAGUSD", "title": "SILVER / USD"},
                {"proName": "FX:EURUSD", "title": "EUR/USD"},
                {"proName": "FX:GBPUSD", "title": "GBP/USD"},
                {"proName": "FX:AUDUSD", "title": "AUD/USD"},
                {"proName": "OANDA:GBPJPY", "title": "GBP/JPY"},
                {"proName": "FX:USDJPY", "title": "USD/JPY"},
                {"proName": "CAPITALCOM:US100", "title": "US 100"},
                {"proName": "CAPITALCOM:US500", "title": "S&P INDEX"},
                {"proName": "CAPITALCOM:US30", "title": "US 30"},
                {"proName": "CRYPTO:BTCUSD", "title": "BTC/USD"},
                {"proName": "CRYPTO:ETHUSD", "title": "ETH/USD"}
            ],
            "colorTheme": "dark",
            "isTransparent": true,
            "showSymbolLogo": true,
            "displayMode": "adaptive",
            "locale": "en"
        }`;
        
        container.current.appendChild(script);

        return () => {
            if (container.current) {
                container.current.innerHTML = ""; // cleanup
            }
        };
    }, []);

    return <div ref={container} className="tradingview-widget-container"></div>;
}

export default memo(TradingViewWidget);
