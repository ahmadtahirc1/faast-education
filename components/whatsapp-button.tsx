'use client'

import { motion } from 'framer-motion'

export default function WhatsAppButton() {
  const whatsappNumber = '923418576000' // Real FAAST Education number
  const message = 'Hi, I am interested in learning more about FAAST Education programs! Please share details.'

  return (
    <motion.a
      href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-8 right-8 z-40"
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.5 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      title="Chat with FAAST Education on WhatsApp"
    >
      <div className="relative">
        {/* Pulse ring */}
        <motion.div
          className="absolute inset-0 bg-green-500 rounded-full"
          animate={{ scale: [1, 1.3, 1] }}
          transition={{ repeat: Infinity, duration: 2 }}
          style={{ opacity: 0.3 }}
        />

        <div className="relative w-16 h-16 bg-green-500 rounded-full flex items-center justify-center text-white shadow-lg hover:shadow-2xl transition-shadow">
          <svg
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.67-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.076 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421-7.403h-.004a9.87 9.87 0 00-5.031 1.378c-3.055 2.01-4.724 5.502-4.142 8.846C3.143 20.033 5.912 22 9 22h4.248c3.087 0 5.857-1.966 6.531-4.796.438-1.882.421-3.88-.419-5.701-1.041-2.226-3.168-3.815-5.359-3.815zm0-2.52C6.501 4.459 2 8.95 2 14.5 2 20.927 7.373 26 12 26h4.248c4.627 0 10-5.073 10-11.5 0-5.55-4.501-10.041-10.051-10.041z" />
          </svg>
        </div>
      </div>
    </motion.a>
  )
}
