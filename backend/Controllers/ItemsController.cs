using Microsoft.AspNetCore.Mvc;
using StockFlow.Api.Models;

namespace StockFlow.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ItemsController : ControllerBase
    {
        private static readonly List<InventoryItem> _items = new()
        {
            new InventoryItem { Name = "27-inch 4K Monitor", Sku = "MON-4K-27", Quantity = 25 },
            new InventoryItem { Name = "Mechanical Keyboard", Sku = "KB-MECH-01", Quantity = 18 },
            new InventoryItem { Name = "Wireless Mouse", Sku = "ACC-MSE-WL", Quantity = 0 },
            new InventoryItem { Name = "Ergonomic Office Chair", Sku = "FURN-CHR-01", Quantity = 5 },
            new InventoryItem { Name = "MacBook Pro M3", Sku = "MBP-M3-14", Quantity = 12 },
            new InventoryItem { Name = "HD Webcam", Sku = "CAM-HD-02", Quantity = 30 }
        };

        [HttpGet]
        public ActionResult<IEnumerable<InventoryItem>> GetItems()
        {
            return Ok(_items.OrderByDescending(i => i.Quantity).ToList());
        }

        [HttpPost]
        public ActionResult<InventoryItem> AddItem(InventoryItem item)
        {
            if (item == null || string.IsNullOrWhiteSpace(item.Name) || string.IsNullOrWhiteSpace(item.Sku))
            {
                return BadRequest("Invalid item data.");
            }

            if (item.Quantity < 0)
            {
                return BadRequest("Quantity must be greater than or equal to 0.");
            }

            item.Id = Guid.NewGuid();
            _items.Add(item);

            return CreatedAtAction(nameof(GetItems), new { id = item.Id }, item);
        }
    }
}
