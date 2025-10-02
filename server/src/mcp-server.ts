import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import Cerebras from '@cerebras/cerebras_cloud_sdk';
import { z } from "zod";
import logger from './utils/logger';
import settings from './config';

// Type definitions for API responses
interface ApiResponse<T = any> {
  status: 'Success' | 'Error';
  data: T;
}

interface OrderResponse {
  orderId: string;
  status: string;
  message: string;
}

interface ProfileResponse {
  user_id: string;
  user_name: string;
  user_shortname: string;
  email: string;
  user_type: string;
  broker: string;
  exchanges: string[];
  products: string[];
  order_types: string[];
  avatar_url: string | null;
  meta: { demat_consent: string };
}

interface PositionsResponse {
  net: any[];
  day: any[];
}

interface OrdersResponse {
  orders: any[];
}

// Initialize Cerebras client
const cerebras = new Cerebras({
  apiKey: settings.CEREBRAS_API_KEY,
});

// Create MCP server
const server = new McpServer({
  name: "trading-mcp-server",
  version: "1.0.0"
});

// Trading Tools using existing APIs

// Buy Stock Tool
server.registerTool(
  "buy-stock",
  {
    title: "Buy Stock",
    description: "Place a buy order for a stock using Kite Connect API",
    inputSchema: {
      apiKey: z.string().describe("Your Kite API key"),
      tradingSymbol: z.string().describe("Stock symbol (e.g., RELIANCE, TCS)"),
      quantity: z.number().min(1).describe("Number of shares to buy"),
      exchange: z.enum(["NSE", "BSE"]).default("NSE").describe("Exchange (NSE or BSE)"),
      product: z.enum(["CNC", "NRML", "MIS"]).default("CNC").describe("Product type"),
      orderType: z.enum(["MARKET", "LIMIT"]).default("MARKET").describe("Order type")
    }
  },
  async ({ apiKey, tradingSymbol, quantity, exchange, product, orderType }) => {
    try {
      logger.info(`MCP: Buy order request - ${tradingSymbol}, qty: ${quantity}`);

      // Call the existing kite-order API
      const response = await fetch('http://localhost:3000/kite/order/place', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          apiKey,
          tradingSymbol,
          quantity,
          transactionType: "BUY",
          exchange,
          product,
          orderType
        })
      });

      const result = await response.json() as ApiResponse<OrderResponse>;

      if (result.status === 'Success') {
        return {
          content: [{
            type: "text",
            text: `✅ Buy order placed successfully!\n📈 Stock: ${tradingSymbol}\n📊 Quantity: ${quantity}\n💰 Order ID: ${result.data.orderId}\n📋 Status: ${result.data.status}`
          }]
        };
      } else {
        return {
          content: [{ type: "text", text: `❌ Buy order failed: ${result.data.message}` }],
          isError: true
        };
      }
    } catch (error: any) {
      logger.error(`MCP Buy order error: ${error.message}`);
      return {
        content: [{ type: "text", text: `❌ Error placing buy order: ${error.message}` }],
        isError: true
      };
    }
  }
);

// Sell Stock Tool
server.registerTool(
  "sell-stock",
  {
    title: "Sell Stock",
    description: "Place a sell order for a stock using Kite Connect API",
    inputSchema: {
      apiKey: z.string().describe("Your Kite API key"),
      tradingSymbol: z.string().describe("Stock symbol (e.g., RELIANCE, TCS)"),
      quantity: z.number().min(1).describe("Number of shares to sell"),
      exchange: z.enum(["NSE", "BSE"]).default("NSE").describe("Exchange (NSE or BSE)"),
      product: z.enum(["CNC", "NRML", "MIS"]).default("CNC").describe("Product type"),
      orderType: z.enum(["MARKET", "LIMIT"]).default("MARKET").describe("Order type")
    }
  },
  async ({ apiKey, tradingSymbol, quantity, exchange, product, orderType }) => {
    try {
      logger.info(`MCP: Sell order request - ${tradingSymbol}, qty: ${quantity}`);

      // Call the existing kite-order API
      const response = await fetch('http://localhost:3000/kite/order/place', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          apiKey,
          tradingSymbol,
          quantity,
          transactionType: "SELL",
          exchange,
          product,
          orderType
        })
      });

      const result = await response.json() as ApiResponse<OrderResponse>;

      if (result.status === 'Success') {
        return {
          content: [{
            type: "text",
            text: `✅ Sell order placed successfully!\n📉 Stock: ${tradingSymbol}\n📊 Quantity: ${quantity}\n💰 Order ID: ${result.data.orderId}\n📋 Status: ${result.data.status}`
          }]
        };
      } else {
        return {
          content: [{ type: "text", text: `❌ Sell order failed: ${result.data.message}` }],
          isError: true
        };
      }
    } catch (error: any) {
      logger.error(`MCP Sell order error: ${error.message}`);
      return {
        content: [{ type: "text", text: `❌ Error placing sell order: ${error.message}` }],
        isError: true
      };
    }
  }
);

// Get Portfolio Analysis
server.registerTool(
  "analyze-portfolio",
  {
    title: "Analyze Portfolio",
    description: "Get detailed portfolio analysis including positions and holdings",
    inputSchema: {
      apiKey: z.string().describe("Your Kite API key")
    }
  },
  async ({ apiKey }) => {
    try {
      logger.info(`MCP: Portfolio analysis request for API key: ${apiKey}`);

      // Get user profile
      const profileResponse = await fetch(`http://localhost:3000/kite/profile?apiKey=${apiKey}`);
      const profile = await profileResponse.json() as ApiResponse<ProfileResponse>;

      // Get positions
      const positionsResponse = await fetch(`http://localhost:3000/kite/positions?apiKey=${apiKey}`);
      const positions = await positionsResponse.json() as ApiResponse<PositionsResponse>;

      // Get order book
      const ordersResponse = await fetch(`http://localhost:3000/kite/orders?apiKey=${apiKey}`);
      const orders = await ordersResponse.json() as ApiResponse<OrdersResponse>;

      if (profile.status === 'Success' && positions.status === 'Success') {
        const analysis = {
          user: profile.data,
          positions: positions.data,
          recentOrders: orders.data?.orders?.slice(0, 5) || []
        };

        return {
          content: [{
            type: "text",
            text: `📊 **Portfolio Analysis**\n\n👤 **User:** ${analysis.user.user_name} (${analysis.user.user_id})\n💰 **Broker:** ${analysis.user.broker}\n📍 **Exchanges:** ${analysis.user.exchanges.join(', ')}\n\n📈 **Positions:** ${analysis.positions.net.length} holdings\n💼 **Products:** ${analysis.user.products.join(', ')}\n\n📋 **Recent Orders:** ${analysis.recentOrders.length} orders`
          }]
        };
      } else {
        return {
          content: [{ type: "text", text: "❌ Failed to retrieve portfolio data" }],
          isError: true
        };
      }
    } catch (error: any) {
      logger.error(`MCP Portfolio analysis error: ${error.message}`);
      return {
        content: [{ type: "text", text: `❌ Error analyzing portfolio: ${error.message}` }],
        isError: true
      };
    }
  }
);

// AI-Powered Portfolio Report Generation
server.registerTool(
  "generate-portfolio-report",
  {
    title: "Generate AI Portfolio Report",
    description: "Generate a comprehensive PDF-style report using Cerebras AI analysis",
    inputSchema: {
      apiKey: z.string().describe("Your Kite API key"),
      includeRecommendations: z.boolean().default(true).describe("Include AI trading recommendations"),
      riskAnalysis: z.boolean().default(true).describe("Include risk analysis"),
      format: z.enum(["text", "structured"]).default("structured").describe("Report format")
    }
  },
  async ({ apiKey, includeRecommendations, riskAnalysis, format }) => {
    try {
      logger.info(`MCP: Generating AI portfolio report for API key: ${apiKey}`);

      // Gather portfolio data
      const [profileRes, positionsRes, ordersRes] = await Promise.all([
        fetch(`http://localhost:3000/kite/profile?apiKey=${apiKey}`),
        fetch(`http://localhost:3000/kite/positions?apiKey=${apiKey}`),
        fetch(`http://localhost:3000/kite/orders?apiKey=${apiKey}`)
      ]);

      const [profile, positions, orders] = await Promise.all([
        profileRes.json() as Promise<ApiResponse<ProfileResponse>>,
        positionsRes.json() as Promise<ApiResponse<PositionsResponse>>,
        ordersRes.json() as Promise<ApiResponse<OrdersResponse>>
      ]);

      if (profile.status !== 'Success' || positions.status !== 'Success') {
        return {
          content: [{ type: "text", text: "❌ Unable to retrieve portfolio data for report generation" }],
          isError: true
        };
      }

      // Prepare data for AI analysis
      const portfolioData = {
        user: profile.data,
        positions: positions.data.net,
        recentOrders: orders.data?.orders?.slice(0, 10) || []
      };

      // Generate AI analysis using Cerebras
      const analysisPrompt = `Analyze this trading portfolio and generate a comprehensive report:

User Profile: ${JSON.stringify(portfolioData.user)}
Current Positions: ${JSON.stringify(portfolioData.positions)}
Recent Orders: ${JSON.stringify(portfolioData.recentOrders)}

${includeRecommendations ? 'Include personalized trading recommendations based on the portfolio.' : ''}
${riskAnalysis ? 'Provide detailed risk analysis and diversification suggestions.' : ''}

Format the report as a professional financial analysis with sections for:
1. Portfolio Overview
2. Performance Analysis
3. Risk Assessment
4. Recommendations
5. Market Insights

Make it comprehensive but concise.`;

      const aiResponse = await cerebras.chat.completions.create({
        messages: [{ role: "user", content: analysisPrompt }],
        model: "llama3.1-70b",
        max_tokens: 2000,
        temperature: 0.7
      });

      const aiAnalysis = (aiResponse as any).choices[0]?.message?.content || "AI analysis unavailable";

      if (format === "structured") {
        return {
          content: [{
            type: "text",
            text: `📊 **AI-Powered Portfolio Report**\n\n${aiAnalysis}\n\n---\n*Generated using Cerebras AI on ${new Date().toLocaleDateString()}*`
          }]
        };
      } else {
        // Simple text format
        return {
          content: [{
            type: "text",
            text: `PORTFOLIO ANALYSIS REPORT\n\n${aiAnalysis}\n\nReport generated: ${new Date().toISOString()}`
          }]
        };
      }

    } catch (error: any) {
      logger.error(`MCP Report generation error: ${error.message}`);
      return {
        content: [{ type: "text", text: `❌ Error generating portfolio report: ${error.message}` }],
        isError: true
      };
    }
  }
);

// Market Sentiment Analysis Tool
server.registerTool(
  "market-sentiment-analysis",
  {
    title: "Market Sentiment Analysis",
    description: "Analyze market sentiment and provide trading insights using AI",
    inputSchema: {
      symbol: z.string().describe("Stock symbol to analyze"),
      context: z.string().optional().describe("Additional context or market conditions"),
      analysisType: z.enum(["technical", "fundamental", "sentiment", "comprehensive"]).default("comprehensive")
    }
  },
  async ({ symbol, context, analysisType }) => {
    try {
      logger.info(`MCP: Market sentiment analysis for ${symbol}`);

      const analysisPrompt = `Perform a ${analysisType} analysis for the stock ${symbol}.

${context ? `Additional context: ${context}` : ''}

Please provide:
1. Current market sentiment
2. Technical indicators (if applicable)
3. Fundamental analysis (if applicable)
4. Price predictions and targets
5. Risk assessment
6. Trading recommendations

Be specific and data-driven in your analysis.`;

      const aiResponse = await cerebras.chat.completions.create({
        messages: [{ role: "user", content: analysisPrompt }],
        model: "llama3.1-70b",
        max_tokens: 1500,
        temperature: 0.6
      });

      const analysis = (aiResponse as any).choices[0]?.message?.content || "Analysis unavailable";

      return {
        content: [{
          type: "text",
          text: `🧠 **AI Market Analysis for ${symbol}**\n\n${analysis}\n\n---\n*Analysis by Cerebras AI*`
        }]
      };

    } catch (error: any) {
      logger.error(`MCP Market analysis error: ${error.message}`);
      return {
        content: [{ type: "text", text: `❌ Error analyzing market sentiment: ${error.message}` }],
        isError: true
      };
    }
  }
);

// Trading Strategy Generator
server.registerTool(
  "generate-trading-strategy",
  {
    title: "AI Trading Strategy Generator",
    description: "Generate personalized trading strategies using AI analysis",
    inputSchema: {
      apiKey: z.string().describe("Your Kite API key"),
      riskTolerance: z.enum(["conservative", "moderate", "aggressive"]).default("moderate"),
      investmentHorizon: z.enum(["short-term", "medium-term", "long-term"]).default("medium-term"),
      focus: z.string().optional().describe("Specific focus areas (e.g., 'dividend stocks', 'growth stocks')")
    }
  },
  async ({ apiKey, riskTolerance, investmentHorizon, focus }) => {
    try {
      logger.info(`MCP: Generating trading strategy for risk: ${riskTolerance}, horizon: ${investmentHorizon}`);

      // Get current portfolio
      const positionsRes = await fetch(`http://localhost:3000/kite/positions?apiKey=${apiKey}`);
      const positions = await positionsRes.json() as ApiResponse<PositionsResponse>;

      const strategyPrompt = `Generate a personalized trading strategy based on:

Risk Tolerance: ${riskTolerance}
Investment Horizon: ${investmentHorizon}
${focus ? `Focus Areas: ${focus}` : ''}
Current Portfolio: ${JSON.stringify(positions.data?.net || [])}

Please provide:
1. Overall strategy overview
2. Asset allocation recommendations
3. Specific stock/sector suggestions
4. Risk management guidelines
5. Performance monitoring metrics
6. Rebalancing schedule

Tailor the strategy to the user's risk profile and current holdings.`;

      const aiResponse = await cerebras.chat.completions.create({
        messages: [{ role: "user", content: strategyPrompt }],
        model: "llama3.1-70b",
        max_tokens: 1800,
        temperature: 0.7
      });

      const strategy = (aiResponse as any).choices[0]?.message?.content || "Strategy generation failed";

      return {
        content: [{
          type: "text",
          text: `🎯 **AI-Generated Trading Strategy**\n\n**Risk Profile:** ${riskTolerance}\n**Time Horizon:** ${investmentHorizon}\n\n${strategy}\n\n---\n*Strategy generated by Cerebras AI*`
        }]
      };

    } catch (error: any) {
      logger.error(`MCP Strategy generation error: ${error.message}`);
      return {
        content: [{ type: "text", text: `❌ Error generating trading strategy: ${error.message}` }],
        isError: true
      };
    }
  }
);

// Start the MCP server
async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  logger.info("🤖 Trading MCP Server started with Cerebras AI integration");
}

main().catch((error) => {
  logger.error(`MCP Server error: ${error}`);
  process.exit(1);
});