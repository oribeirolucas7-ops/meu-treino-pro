/**
 * Utilitário para compressão de imagens antes do upload.
 * 
 * Finalidade:
 * 1. Respeitar o limite de 1GB do plano gratuito do Supabase Storage.
 * 2. Reduzir o consumo de banda (Bandwidth) do usuário.
 * 3. Melhorar a velocidade de carregamento da aplicação.
 */
export async function compressImage(file: File, maxWidth = 800, quality = 0.7): Promise<Blob> {
  return new Promise((resolve, reject) => {
    // Lê o arquivo local como uma URL de dados
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target?.result as string;
      img.onload = () => {
        // Redimensionamento proporcional usando Canvas
        const canvas = document.createElement('canvas');
        let width = img.width;
        let height = img.height;

        if (width > maxWidth) {
          height = (maxWidth / width) * height;
          width = maxWidth;
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx?.drawImage(img, 0, 0, width, height);

        // Exporta para Blob (formato comprimido JPEG)
        canvas.toBlob(
          (blob) => {
            if (blob) resolve(blob);
            else reject(new Error('Falha na compressão da imagem'));
          },
          'image/jpeg',
          quality
        );
      };
    };
    reader.onerror = (error) => reject(error);
  });
}