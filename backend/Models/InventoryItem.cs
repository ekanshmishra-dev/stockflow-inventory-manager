namespace StockFlow.Api.Models
{
    public class InventoryItem
    {
        public Guid Id { get; set; } = Guid.NewGuid();
        public required string Name { get; set; }
        public required string Sku { get; set; }
        public int Quantity { get; set; }
        
        public string StockStatus => Quantity switch
        {
            0 => "Out of Stock",
            <= 10 => "Low Stock",
            _ => "In Stock"
        };
    }
}
