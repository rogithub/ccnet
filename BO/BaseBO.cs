using System;

namespace BO
{
    public interface IGuidId
    {
        Guid Id { get; set; }
    }

    public interface IFolio
    {
        int Folio { get; set; }
    }

    public class BaseBO : IGuidId
    {
        public BaseBO()
        {
            this.Id = Guid.NewGuid();
        }
        public BaseBO(Guid id)
        {
            this.Id = id;
        }
        public Guid Id { get; set; }
    }
}