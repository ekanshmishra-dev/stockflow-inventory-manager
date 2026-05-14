FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src

COPY ["StockFlow.Api.csproj", "./"]
RUN dotnet restore "./StockFlow.Api.csproj"

COPY . .
RUN dotnet build "StockFlow.Api.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "StockFlow.Api.csproj" -c Release -o /app/publish /p:UseAppHost=false

FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS final
WORKDIR /app

EXPOSE 8080
ENV ASPNETCORE_URLS=http://0.0.0.0:8080

COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "StockFlow.Api.dll"]